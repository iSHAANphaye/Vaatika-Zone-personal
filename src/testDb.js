import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

// Setup colors for prettier logs
const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

async function runTests() {
  console.log(`${yellow}Starting Database Seeding & Schema Validation Tests...${reset}\n`);

  // 1. Connect to Database
  await connectDB();

  try {
    // Keep track of created IDs for cleanup
    let testUserId;
    let testProductId;
    let testOrderId;

    // --- TEST 1: User Schema & Password Hashing ---
    console.log(`${yellow}[Test 1] Testing User Schema & Password Hashing...${reset}`);
    
    // Clean up any existing test user just in case
    await User.deleteMany({ email: 'test_user@vaatika.zone' });

    const userObj = {
      name: 'John Test Doe',
      email: 'TEST_USER@vaatika.zone', // Testing lowercase conversion
      password: 'mysecurepassword123',
      role: 'customer'
    };

    const user = new User(userObj);
    const savedUser = await user.save();
    testUserId = savedUser._id;

    console.log(`- Created User: ${savedUser.name} (${savedUser.email})`);
    console.log(`- Stored Password (hashed): ${savedUser.password}`);
    
    // Verify password hashing worked
    if (savedUser.password === 'mysecurepassword123') {
      throw new Error('Password was not hashed!');
    }
    console.log(`- Password hashing: ${green}PASSED${reset}`);

    // Verify password comparison works
    const isMatch = await savedUser.comparePassword('mysecurepassword123');
    const isWrongMatch = await savedUser.comparePassword('wrongpassword');
    
    if (isMatch && !isWrongMatch) {
      console.log(`- Password comparison verification: ${green}PASSED${reset}`);
    } else {
      throw new Error('Password comparison logic failed!');
    }

    // Verify lowercase email indexing
    if (savedUser.email !== 'test_user@vaatika.zone') {
      throw new Error('Email lowercase transformation failed!');
    }
    console.log(`- Email lowercase normalization: ${green}PASSED${reset}`);
    console.log(`${green}[Test 1] PASSED${reset}\n`);


    // --- TEST 2: Product Schema & Attributes ---
    console.log(`${yellow}[Test 2] Testing Product Schema & Flexible Attributes...${reset}`);
    
    const productObj = {
      name: 'Monstera Deliciosa',
      description: 'A beautiful tropical houseplant with characteristic split leaves.',
      price: 29.99,
      category: 'Plants',
      stockCount: 15,
      images: ['https://example.com/monstera1.jpg', 'https://example.com/monstera2.jpg'],
      attributes: {
        wateringFrequency: 'Once a week',
        sunlight: 'Indirect bright light',
        potSizeInches: 8,
        isPetFriendly: false
      }
    };

    const product = new Product(productObj);
    const savedProduct = await product.save();
    testProductId = savedProduct._id;

    console.log(`- Created Product: ${savedProduct.name} - Price: $${savedProduct.price}`);
    console.log(`- Dynamic Attributes Stored:`, savedProduct.attributes);
    
    if (savedProduct.attributes.potSizeInches === 8 && savedProduct.attributes.isPetFriendly === false) {
      console.log(`- Flexible Attributes retrieval: ${green}PASSED${reset}`);
    } else {
      throw new Error('Attributes mapping failed!');
    }
    console.log(`${green}[Test 2] PASSED${reset}\n`);


    // --- TEST 3: Order Schema & Total Price Pre-save Hook ---
    console.log(`${yellow}[Test 3] Testing Order Schema & Total Price Calculation...${reset}`);

    const orderObj = {
      user: testUserId,
      orderedItems: [
        {
          product: testProductId,
          quantity: 2,
          price: 29.99 // snapshot price
        }
      ],
      shippingAddress: {
        street: '123 Flora Lane',
        city: 'Greenhouse',
        state: 'Nirvana',
        postalCode: '90210',
        country: 'Botanica'
      },
      paymentStatus: 'pending',
      orderStatus: 'pending'
    };

    const order = new Order(orderObj);
    const savedOrder = await order.save();
    testOrderId = savedOrder._id;

    console.log(`- Created Order ID: ${savedOrder._id}`);
    console.log(`- Total Amount Auto-Calculated: $${savedOrder.totalAmount}`);

    // Verify calculation (2 * 29.99 = 59.98)
    if (savedOrder.totalAmount === 59.98) {
      console.log(`- Total amount validation: ${green}PASSED${reset}`);
    } else {
      throw new Error(`Expected total amount 59.98, got ${savedOrder.totalAmount}`);
    }
    console.log(`${green}[Test 3] PASSED${reset}\n`);


    // --- TEST 4: Validation Errors Check ---
    console.log(`${yellow}[Test 4] Testing Schema Validations (Error Catching)...${reset}`);

    // Test negative price validation on Product
    try {
      const invalidProduct = new Product({
        name: 'Invalid Plant',
        description: 'Should fail',
        price: -5, // Negative price
        category: 'Test'
      });
      await invalidProduct.save();
      throw new Error('Negative price validation should have thrown an error!');
    } catch (err) {
      if (err.errors && err.errors.price) {
        console.log(`- Price negative limit check: ${green}PASSED${reset} (Caught error: "${err.errors.price.message}")`);
      } else {
        throw err;
      }
    }

    // Test invalid role validation on User
    try {
      const invalidUser = new User({
        name: 'Bad Role User',
        email: 'badrole@vaatika.zone',
        password: 'password123',
        role: 'super_admin' // Invalid role
      });
      await invalidUser.save();
      throw new Error('Invalid user role validation should have thrown an error!');
    } catch (err) {
      if (err.errors && err.errors.role) {
        console.log(`- User role enum check: ${green}PASSED${reset} (Caught error: "${err.errors.role.message}")`);
      } else {
        throw err;
      }
    }

    // Test invalid email validation on User
    try {
      const invalidUser = new User({
        name: 'Bad Email User',
        email: 'not-an-email',
        password: 'password123'
      });
      await invalidUser.save();
      throw new Error('Invalid email validation should have thrown an error!');
    } catch (err) {
      if (err.errors && err.errors.email) {
        console.log(`- User email format check: ${green}PASSED${reset} (Caught error: "${err.errors.email.message}")`);
      } else {
        throw err;
      }
    }
    console.log(`${green}[Test 4] PASSED${reset}\n`);


    // --- TEST 5: Populate References ---
    console.log(`${yellow}[Test 5] Testing Database Populated References...${reset}`);

    const populatedOrder = await Order.findById(testOrderId)
      .populate('user', 'name email role')
      .populate('orderedItems.product', 'name price category');

    console.log(`- Populated Order Buyer Name: ${populatedOrder.user.name}`);
    console.log(`- Populated First Item Name: ${populatedOrder.orderedItems[0].product.name}`);

    if (populatedOrder.user.name === 'John Test Doe' && populatedOrder.orderedItems[0].product.name === 'Monstera Deliciosa') {
      console.log(`- Mongoose Population: ${green}PASSED${reset}`);
    } else {
      throw new Error('Population of references failed!');
    }
    console.log(`${green}[Test 5] PASSED${reset}\n`);


    // --- CLEANUP ---
    console.log(`${yellow}Cleaning up test documents...${reset}`);
    await User.findByIdAndDelete(testUserId);
    await Product.findByIdAndDelete(testProductId);
    await Order.findByIdAndDelete(testOrderId);
    console.log(`- Cleanup: ${green}PASSED${reset}`);

    console.log(`\n${green}★ ALL TESTS PASSED SUCCESSFULLY! ★${reset}`);

  } catch (error) {
    console.error(`\n${red}✖ TEST FAILURE: ${error.message}${reset}`);
    if (error.stack) {
      console.error(error.stack);
    }
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log(`\nDatabase connection closed.`);
  }
}

runTests();
