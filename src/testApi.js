import { server } from './index.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const BASE_URL = 'http://127.0.0.1:5000';

async function runApiTests() {
  console.log(`${yellow}Starting Backend REST API Integration Tests...${reset}\n`);

  // Wait a moment for server to bind & database to connect
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    let token = '';
    let testUserId = '';
    let testProductId = '';
    let initialStock = 0;
    let testOrderId = '';

    // --- TEST 1: Root / Health Check ---
    console.log(`${yellow}[Test 1] GET /api/health (Health Check)...${reset}`);
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    if (healthRes.status === 200 && healthData.success) {
      console.log(`- Response: ${green}OK${reset} ("${healthData.message}")`);
    } else {
      throw new Error(`Healthcheck failed with status: ${healthRes.status}`);
    }
    console.log(`${green}[Test 1] PASSED${reset}\n`);


    // --- TEST 2: User Registration ---
    console.log(`${yellow}[Test 2] POST /api/auth/register (New User)...${reset}`);
    // Cleanup any leftovers
    await User.deleteMany({ email: 'apitester@vaatika.in' });

    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'API Tester',
        email: 'apitester@vaatika.in',
        password: 'password123',
      }),
    });
    const regData = await regRes.json();
    if (regRes.status === 201 && regData.success && regData.token) {
      token = regData.token;
      testUserId = regData.data.user._id;
      console.log(`- Registered User: ${regData.data.user.name}`);
      console.log(`- Token generated: ${token.substring(0, 20)}...`);
    } else {
      throw new Error(`Registration failed: ${regData.message}`);
    }
    console.log(`${green}[Test 2] PASSED${reset}\n`);


    // --- TEST 3: User Login ---
    console.log(`${yellow}[Test 3] POST /api/auth/login (Existing User)...${reset}`);
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'apitester@vaatika.in',
        password: 'password123',
      }),
    });
    const loginData = await loginRes.json();
    if (loginRes.status === 200 && loginData.success && loginData.token) {
      console.log(`- Logged in successfully. Token matches: ${loginData.token === token}`);
    } else {
      throw new Error(`Login failed: ${loginData.message}`);
    }
    console.log(`${green}[Test 3] PASSED${reset}\n`);


    // --- TEST 4: Get All Products (Sorting & Filtering) ---
    console.log(`${yellow}[Test 4] GET /api/products (Sorting & Filtering)...${reset}`);
    
    // Fetch all products
    const prodResAll = await fetch(`${BASE_URL}/api/products`);
    const prodDataAll = await prodResAll.json();
    console.log(`- Found ${prodDataAll.count} total products.`);
    if (prodDataAll.count === 0) {
      throw new Error('Database is empty. Please run "npm run seed" first!');
    }
    
    // Test Category filter
    const prodResFilter = await fetch(`${BASE_URL}/api/products?category=Fruits`);
    const prodDataFilter = await prodResFilter.json();
    console.log(`- Category=Fruits returned ${prodDataFilter.count} items.`);
    prodDataFilter.data.products.forEach(p => {
      if (p.category !== 'Fruits') throw new Error(`Filter failed! Got product with category ${p.category}`);
    });
    console.log(`- Filtering by category: ${green}PASSED${reset}`);

    // Test Price sorting ascending
    const prodResSort = await fetch(`${BASE_URL}/api/products?sort=price`);
    const prodDataSort = await prodResSort.json();
    const prices = prodDataSort.data.products.map(p => p.price);
    console.log(`- Sorted prices (ascending):`, prices);
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] > prices[i+1]) throw new Error('Price sorting ascending failed!');
    }
    console.log(`- Sorting by price (asc): ${green}PASSED${reset}`);

    // Save one product for subsequent tests
    const targetProduct = prodDataAll.data.products[0];
    testProductId = targetProduct._id;
    initialStock = targetProduct.stockCount;
    console.log(`- Target Product for Order: ${targetProduct.name} (Stock: ${initialStock}, Price: ₹${targetProduct.price})`);
    console.log(`${green}[Test 4] PASSED${reset}\n`);


    // --- TEST 5: Get Single Product by ID ---
    console.log(`${yellow}[Test 5] GET /api/products/:id (Get single item)...${reset}`);
    const singleRes = await fetch(`${BASE_URL}/api/products/${testProductId}`);
    const singleData = await singleRes.json();
    if (singleRes.status === 200 && singleData.success && singleData.data.product.name === targetProduct.name) {
      console.log(`- Product matched: "${singleData.data.product.name}"`);
    } else {
      throw new Error('Single product retrieve failed or matched incorrectly');
    }
    console.log(`${green}[Test 5] PASSED${reset}\n`);


    // --- TEST 6: Protect Middleware Check ---
    console.log(`${yellow}[Test 6] POST /api/orders (Without auth header)...${reset}`);
    const unauthorizedRes = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const unauthorizedData = await unauthorizedRes.json();
    if (unauthorizedRes.status === 401 && !unauthorizedData.success) {
      console.log(`- Blocked unauthorized check: ${green}PASSED${reset} ("${unauthorizedData.message}")`);
    } else {
      throw new Error(`Route protection failed, status code: ${unauthorizedRes.status}`);
    }
    console.log(`${green}[Test 6] PASSED${reset}\n`);


    // --- TEST 7: Successful Order & Stock Deduction ---
    console.log(`${yellow}[Test 7] POST /api/orders (Successful Order & Stock Deduction)...${reset}`);
    const orderPayload = {
      orderedItems: [
        {
          product: testProductId,
          quantity: 2,
        },
      ],
      shippingAddress: {
        street: 'Building 14, Ring Road',
        city: 'Raipur',
        state: 'Chhattisgarh',
        postalCode: '492001',
        country: 'India',
      },
    };

    const orderRes = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });
    const orderData = await orderRes.json();

    if (orderRes.status === 201 && orderData.success) {
      testOrderId = orderData.data.order._id;
      console.log(`- Placed Order ID: ${testOrderId}`);
      console.log(`- Calculated Total Price: ₹${orderData.data.order.totalAmount}`);
      
      // Verify Stock level in Database
      const updatedProduct = await Product.findById(testProductId);
      console.log(`- Product Stock before: ${initialStock}, after order: ${updatedProduct.stockCount}`);
      if (updatedProduct.stockCount === initialStock - 2) {
        console.log(`- Atomic Stock level deduction: ${green}PASSED${reset}`);
      } else {
        throw new Error(`Stock deduction mismatch! Expected ${initialStock - 2}, got ${updatedProduct.stockCount}`);
      }
    } else {
      throw new Error(`Order placement failed: ${orderData.message}`);
    }
    console.log(`${green}[Test 7] PASSED${reset}\n`);


    // --- TEST 8: Insufficient Stock check ---
    console.log(`${yellow}[Test 8] POST /api/orders (Verify Insufficient Stock error)...${reset}`);
    const updatedProd = await Product.findById(testProductId);
    const excessiveQty = updatedProd.stockCount + 10;
    
    const failedOrderPayload = {
      orderedItems: [
        {
          product: testProductId,
          quantity: excessiveQty,
        },
      ],
      shippingAddress: {
        street: 'Main Road',
        city: 'Durg',
        state: 'Chhattisgarh',
        postalCode: '491001',
        country: 'India',
      },
    };

    const failedOrderRes = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(failedOrderPayload),
    });
    const failedOrderData = await failedOrderRes.json();

    if (failedOrderRes.status === 400 && !failedOrderData.success) {
      console.log(`- Insufficient stock prevention: ${green}PASSED${reset} ("${failedOrderData.message}")`);
    } else {
      throw new Error(`Insufficent stock should have been rejected, status code: ${failedOrderRes.status}`);
    }
    console.log(`${green}[Test 8] PASSED${reset}\n`);


    // --- CLEANUP ---
    console.log(`${yellow}Cleaning up test documents from database...${reset}`);
    
    // Delete placed order
    await Order.findByIdAndDelete(testOrderId);
    // Delete test user
    await User.findByIdAndDelete(testUserId);
    // Restore product stock level
    await Product.findByIdAndUpdate(testProductId, { stockCount: initialStock });
    
    console.log(`- Cleanup: ${green}PASSED${reset}`);
    console.log(`\n${green}★ ALL API TESTS PASSED SUCCESSFULLY! ★${reset}`);

  } catch (error) {
    console.error(`\n${red}✖ API TEST FAILURE: ${error.message}${reset}`);
    if (error.stack) {
      console.error(error.stack);
    }
  } finally {
    // Shutdown server
    console.log(`\nClosing server...`);
    server.close(() => {
      console.log(`Server closed.`);
      process.exit(0);
    });
  }
}

runApiTests();
