import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const seedData = async () => {
  console.log(`${yellow}Connecting to database for Chhattisgarh Fruits & Vegetables Seeding...${reset}`);
  await connectDB();

  try {
    // 1. Clear existing collection data to ensure a fresh, clean seed
    console.log(`${yellow}Clearing existing collections...${reset}`);
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log(`- Collections cleared: ${green}SUCCESS${reset}`);

    // 2. Seed Users
    console.log(`\n${yellow}Seeding Users...${reset}`);
    const users = [
      {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        password: 'password123',
        role: 'customer',
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@yahoo.co.in',
        password: 'password123',
        role: 'customer',
      },
      {
        name: 'Aditya Verma',
        email: 'aditya.verma@vaatika.in',
        password: 'adminpass123',
        role: 'admin',
      },
    ];

    const createdUsers = await User.create(users);
    console.log(`- Seeded ${createdUsers.length} Users successfully.`);
    createdUsers.forEach((u) => console.log(`  • ${u.name} (${u.role}) - ${u.email}`));

    // 3. Seed Products (Fruits & Vegetables)
    console.log(`\n${yellow}Seeding Products (Fruits & Vegetables)...${reset}`);
    const products = [
      {
        name: 'Nagpur Oranges (1kg)',
        description: 'Juicy and sweet Nagpur mandarins, rich in Vitamin C, handpicked and fresh.',
        price: 120.00, // INR
        category: 'Fruits',
        stockCount: 80,
        images: ['https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500'],
        attributes: {
          origin: 'Nagpur',
          type: 'Citrus',
          grade: 'Premium A',
          shelfLifeDays: 7,
        },
      },
      {
        name: 'Kashmiri Red Apples (1kg)',
        description: 'Crisp, sweet, and locally sourced premium red apples from the orchards of Kashmir.',
        price: 180.00, // INR
        category: 'Fruits',
        stockCount: 50,
        images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500'],
        attributes: {
          origin: 'Kashmir',
          variety: 'Red Delicious',
          organic: true,
          shelfLifeDays: 10,
        },
      },
      {
        name: 'Local Fresh Bhindi / Okra (500g)',
        description: 'Freshly harvested tender green ladies finger (okra), ideal for traditional stir fry dishes.',
        price: 30.00, // INR
        category: 'Vegetables',
        stockCount: 60,
        images: ['https://images.unsplash.com/photo-1627998797087-9bb322b7a0d4?w=500'],
        attributes: {
          farm: 'Durg Local Organic Farm',
          variety: 'Desi Bhindi',
          freshnessHrs: 24,
        },
      },
      {
        name: 'Desi Tomatoes (1kg)',
        description: 'Farm-fresh tangy tomatoes, perfect for adding rich flavor and texture to traditional curries.',
        price: 40.00, // INR
        category: 'Vegetables',
        stockCount: 120,
        images: ['https://images.unsplash.com/photo-1595855759920-86582396756a?w=500'],
        attributes: {
          farm: 'Raipur Cooperative Farms',
          ripeness: 'Medium-Hard',
          isLocal: true,
        },
      },
      {
        name: 'Organic Potatoes / Aloo (1kg)',
        description: 'Multi-purpose starchy organic potatoes sourced from local farmers in Chhattisgarh.',
        price: 35.00, // INR
        category: 'Vegetables',
        stockCount: 150,
        images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500'],
        attributes: {
          organic: true,
          variety: 'Jyoti Potato',
          dirtFree: true,
          shelfLifeDays: 20,
        },
      },
    ];

    const createdProducts = await Product.create(products);
    console.log(`- Seeded ${createdProducts.length} Products successfully.`);
    createdProducts.forEach((p) => console.log(`  • ${p.name} (${p.category}) - ₹${p.price}`));

    // Find User and Product IDs for linking orders
    const aarav = createdUsers.find(u => u.name === 'Aarav Sharma');
    const priya = createdUsers.find(u => u.name === 'Priya Patel');

    const oranges = createdProducts.find(p => p.name.includes('Oranges'));
    const apples = createdProducts.find(p => p.name.includes('Apples'));
    const bhindi = createdProducts.find(p => p.name.includes('Bhindi'));
    const tomatoes = createdProducts.find(p => p.name.includes('Tomatoes'));
    const potatoes = createdProducts.find(p => p.name.includes('Potatoes'));

    // 4. Seed Orders (with Chhattisgarh Shipping Addresses)
    console.log(`\n${yellow}Seeding Orders (Chhattisgarh shipping addresses)...${reset}`);
    const orders = [
      {
        user: aarav._id,
        orderedItems: [
          {
            product: oranges._id,
            quantity: 2,
            price: oranges.price, // ₹120 * 2 = ₹240
          },
          {
            product: potatoes._id,
            quantity: 1,
            price: potatoes.price, // ₹35 * 1 = ₹35
          }
        ],
        // totalAmount will be auto-calculated as ₹275 by our pre-validate hook
        shippingAddress: {
          street: 'Flat 204, Shanti Vihar Apartments, Shankar Nagar',
          city: 'Raipur',
          state: 'Chhattisgarh',
          postalCode: '492007',
          country: 'India',
        },
        paymentStatus: 'paid',
        orderStatus: 'delivered',
      },
      {
        user: priya._id,
        orderedItems: [
          {
            product: apples._id,
            quantity: 1,
            price: apples.price, // ₹180 * 1 = ₹180
          },
          {
            product: bhindi._id,
            quantity: 2,
            price: bhindi.price, // ₹30 * 2 = ₹60
          },
          {
            product: tomatoes._id,
            quantity: 3,
            price: tomatoes.price, // ₹40 * 3 = ₹120
          }
        ],
        // totalAmount will be auto-calculated as ₹360 by our pre-validate hook
        shippingAddress: {
          street: 'House No. 12, Street 3, Sector 2, Civic Center',
          city: 'Bhilai',
          state: 'Chhattisgarh',
          postalCode: '490006',
          country: 'India',
        },
        paymentStatus: 'pending',
        orderStatus: 'processing',
      }
    ];

    const createdOrders = await Order.create(orders);
    console.log(`- Seeded ${createdOrders.length} Orders successfully.`);
    createdOrders.forEach((o, index) => {
      console.log(`  • Order #${index+1} (ID: ${o._id})`);
      console.log(`    Buyer: ${index === 0 ? aarav.name : priya.name}`);
      console.log(`    Amount: ₹${o.totalAmount}`);
      console.log(`    Status: Payment (${o.paymentStatus}), Order (${o.orderStatus})`);
      console.log(`    Shipping to: ${o.shippingAddress.city}, ${o.shippingAddress.state}`);
    });

    console.log(`\n${green}★ DATABASE SEEDING COMPLETED SUCCESSFULLY! ★${reset}`);

  } catch (error) {
    console.error(`\n${red}✖ SEEDING ERROR: ${error.message}${reset}`);
    if (error.stack) {
      console.error(error.stack);
    }
  } finally {
    await mongoose.connection.close();
    console.log(`\nDatabase connection closed.`);
  }
};

seedData();
