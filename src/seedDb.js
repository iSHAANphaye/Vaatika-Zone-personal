import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const adjectives = ['Organic', 'Premium', 'Fresh', 'Desi', 'Local Farm', 'Sweet', 'Tangy', 'Sun-ripened', 'Green', 'Red', 'Hybrid', 'Crisp'];

const vegetables = [
  { name: 'Tomato (Tamatar)', basePrice: 40, desc: 'Tangy red tomatoes sourced from local Chhattisgarh farms.', image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=500' },
  { name: 'Potato (Aloo)', basePrice: 30, desc: 'Versatile farm-fresh starchy potatoes, perfect for daily household curries.', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500' },
  { name: 'Onion (Pyaz)', basePrice: 35, desc: 'Crucial ingredient for every Indian gravy, freshly harvested and dried.', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500' },
  { name: 'Lady Finger (Bhindi)', basePrice: 60, desc: 'Tender and slender green okra, fresh and fiber-rich.', image: 'https://images.unsplash.com/photo-1627998797087-9bb322b7a0d4?w=500' },
  { name: 'Brinjal (Baingan)', basePrice: 40, desc: 'Local bhanta brinjal, rich in taste and perfect for making chokha.', image: 'https://images.unsplash.com/photo-1590378368519-01103f698379?w=500' },
  { name: 'Cabbage (Patta Gobhi)', basePrice: 45, desc: 'Crisp green cabbage heads harvested early in the morning.', image: 'https://images.unsplash.com/photo-1550157548-3907eed4e8bd?w=500' },
  { name: 'Cauliflower (Phool Gobhi)', basePrice: 50, desc: 'Fresh local white cauliflower florets, clean and insect-free.', image: 'https://images.unsplash.com/photo-1568584711271-e30574906964?w=500' },
  { name: 'Spinach (Palak)', basePrice: 25, desc: 'Iron-rich green leafy spinach, pesticide-free and washed.', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500' },
  { name: 'Coriander (Dhania)', basePrice: 20, desc: 'Fresh fragrant coriander leaves, essential for garnishing dishes.', image: 'https://images.unsplash.com/photo-1588879460618-9249e7d947d1?w=500' },
  { name: 'Green Chillies (Hari Mirch)', basePrice: 80, desc: 'Spicy green chillies to add heat to your local meals.', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500' },
  { name: 'Ginger (Adrak)', basePrice: 120, desc: 'Aromatic earthy ginger root, great for tea and curries.', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500' },
  { name: 'Garlic (Lahsun)', basePrice: 150, desc: 'Flavorful local garlic bulbs, pungent and fresh.', image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500' },
];

const fruits = [
  { name: 'Mango (Aam)', basePrice: 150, desc: 'Sweet juicy mangoes, the king of fruits, popular in summer seasons.', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500' },
  { name: 'Banana (Kela)', basePrice: 50, desc: 'Energizing sweet bananas, rich in potassium and sourced locally.', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500' },
  { name: 'Apple (Seb)', basePrice: 180, desc: 'Crisp and sweet Kashmiri red apples, highly nutritious.', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500' },
  { name: 'Papaya (Papita)', basePrice: 60, desc: 'Sweet orange papaya, rich in digestive enzymes and vitamins.', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500' },
  { name: 'Guava (Amrood)', basePrice: 70, desc: 'Fresh white/pink pulp guavas, sweet with a pinch of salt.', image: 'https://images.unsplash.com/photo-1534080391025-aa7c0835c24b?w=500' },
  { name: 'Watermelon (Tarbooj)', basePrice: 80, desc: 'Hydrating sweet red watermelons, perfect for hot Chhattisgarh summers.', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500' },
  { name: 'Pomegranate (Anar)', basePrice: 200, desc: 'Ruby red sweet pomegranate seeds, fresh and antioxidant-rich.', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500' },
  { name: 'Grapes (Angoor)', basePrice: 100, desc: 'Sweet and seedless green grapes, juicy and fresh.', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500' },
  { name: 'Orange (Santra)', basePrice: 120, desc: 'Citrusy sweet oranges, rich in Vitamin C and fiber.', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500' },
];

const packSizes = [
  { suffix: '500g Pack', mult: 0.5 },
  { suffix: '1kg Pack', mult: 1.0 },
  { suffix: '2kg Family Pack', mult: 1.9 },
  { suffix: 'Premium Select', mult: 1.2 }
];

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

    // 3. Seed Products (Fruits & Vegetables dynamically generated)
    console.log(`\n${yellow}Generating and Seeding Products (Fruits & Vegetables)...${reset}`);
    const productsToInsert = [];
    const nameSet = new Set(); // Prevent duplicate names

    // Generate unique products
    for (const adj of adjectives) {
      // 1. Process Vegetables
      for (const veg of vegetables) {
        for (const pack of packSizes) {
          const name = `${adj} ${veg.name} - ${pack.suffix}`;
          if (!nameSet.has(name)) {
            nameSet.add(name);

            // Calculate price based on item basePrice, adj premium, and pack size multiplier
            const basePriceAdjusted = veg.basePrice * (adj === 'Organic' || adj === 'Premium' ? 1.25 : 1.0);
            const finalPrice = Math.round(basePriceAdjusted * pack.mult);

            productsToInsert.push({
              name,
              description: `${adj} grade. ${veg.desc}`,
              price: finalPrice,
              category: 'Vegetables',
              stockCount: Math.floor(Math.random() * 190) + 10, // 10 to 200
              images: [veg.image],
              attributes: {
                origin: Math.random() > 0.5 ? 'Raipur Farm' : 'Durg Farm',
                organic: adj === 'Organic',
                grade: adj === 'Premium' ? 'A+' : 'Standard',
              }
            });
          }
        }
      }

      // 2. Process Fruits
      for (const fruit of fruits) {
        for (const pack of packSizes) {
          const name = `${adj} ${fruit.name} - ${pack.suffix}`;
          if (!nameSet.has(name)) {
            nameSet.add(name);

            const basePriceAdjusted = fruit.basePrice * (adj === 'Organic' || adj === 'Premium' ? 1.3 : 1.0);
            const finalPrice = Math.round(basePriceAdjusted * pack.mult);

            productsToInsert.push({
              name,
              description: `${adj} grade. ${fruit.desc}`,
              price: finalPrice,
              category: 'Fruits',
              stockCount: Math.floor(Math.random() * 140) + 10, // 10 to 150
              images: [fruit.image],
              attributes: {
                origin: Math.random() > 0.5 ? 'Bhilai Orchards' : 'Kashmir Import',
                organic: adj === 'Organic',
                sweetnessLevel: 'High',
              }
            });
          }
        }
      }
    }

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`- Seeded ${green}${createdProducts.length} Products${reset} successfully in MongoDB.`);

    // Find User and Product IDs for linking orders
    const aarav = createdUsers.find(u => u.name === 'Aarav Sharma');
    const priya = createdUsers.find(u => u.name === 'Priya Patel');

    const oranges = createdProducts.find(p => p.name.includes('Orange'));
    const apples = createdProducts.find(p => p.name.includes('Apple'));
    const bhindi = createdProducts.find(p => p.name.includes('Bhindi'));
    const tomatoes = createdProducts.find(p => p.name.includes('Tomato'));
    const potatoes = createdProducts.find(p => p.name.includes('Potato'));

    // 4. Seed Orders (with Chhattisgarh Shipping Addresses)
    console.log(`\n${yellow}Seeding Orders (Chhattisgarh shipping addresses)...${reset}`);
    const orders = [
      {
        user: aarav._id,
        orderedItems: [
          {
            product: oranges._id,
            quantity: 2,
            price: oranges.price, // Calculated from selected Orange pack
          },
          {
            product: potatoes._id,
            quantity: 1,
            price: potatoes.price, // Calculated from selected Potato pack
          }
        ],
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
            price: apples.price,
          },
          {
            product: bhindi._id,
            quantity: 2,
            price: bhindi.price,
          },
          {
            product: tomatoes._id,
            quantity: 3,
            price: tomatoes.price,
          }
        ],
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
      console.log(`  • Order #${index + 1} (ID: ${o._id})`);
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
