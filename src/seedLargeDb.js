import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Product from './models/Product.js';

const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const adjectives = ['Organic', 'Premium', 'Fresh', 'Desi', 'Local Farm', 'Sweet', 'Tangy', 'Sun-ripened', 'Green', 'Red', 'Hybrid', 'Crisp'];

const vegetables = [
  { name: 'Tomato (Tamatar)', basePrice: 40, desc: 'Tangy red tomatoes sourced from local Chhattisgarh farms.' },
  { name: 'Potato (Aloo)', basePrice: 30, desc: 'Versatile farm-fresh starchy potatoes, perfect for daily household curries.' },
  { name: 'Onion (Pyaz)', basePrice: 35, desc: 'Crucial ingredient for every Indian gravy, freshly harvested and dried.' },
  { name: 'Lady Finger (Bhindi)', basePrice: 60, desc: 'Tender and slender green okra, fresh and fiber-rich.' },
  { name: 'Brinjal (Baingan)', basePrice: 40, desc: 'Local bhanta brinjal, rich in taste and perfect for making chokha.' },
  { name: 'Cabbage (Patta Gobhi)', basePrice: 45, desc: 'Crisp green cabbage heads harvested early in the morning.' },
  { name: 'Cauliflower (Phool Gobhi)', basePrice: 50, desc: 'Fresh local white cauliflower florets, clean and insect-free.' },
  { name: 'Spinach (Palak)', basePrice: 25, desc: 'Iron-rich green leafy spinach, pesticide-free and washed.' },
  { name: 'Coriander (Dhania)', basePrice: 20, desc: 'Fresh fragrant coriander leaves, essential for garnishing dishes.' },
  { name: 'Green Chillies (Hari Mirch)', basePrice: 80, desc: 'Spicy green chillies to add heat to your local meals.' },
  { name: 'Ginger (Adrak)', basePrice: 120, desc: 'Aromatic earthy ginger root, great for tea and curries.' },
  { name: 'Garlic (Lahsun)', basePrice: 150, desc: 'Flavorful local garlic bulbs, pungent and fresh.' },
];

const fruits = [
  { name: 'Mango (Aam)', basePrice: 150, desc: 'Sweet juicy mangoes, the king of fruits, popular in summer seasons.' },
  { name: 'Banana (Kela)', basePrice: 50, desc: 'Energizing sweet bananas, rich in potassium and sourced locally.' },
  { name: 'Apple (Seb)', basePrice: 180, desc: 'Crisp and sweet Kashmiri red apples, highly nutritious.' },
  { name: 'Papaya (Papita)', basePrice: 60, desc: 'Sweet orange papaya, rich in digestive enzymes and vitamins.' },
  { name: 'Guava (Amrood)', basePrice: 70, desc: 'Fresh white/pink pulp guavas, sweet with a pinch of salt.' },
  { name: 'Watermelon (Tarbooj)', basePrice: 80, desc: 'Hydrating sweet red watermelons, perfect for hot Chhattisgarh summers.' },
  { name: 'Pomegranate (Anar)', basePrice: 200, desc: 'Ruby red sweet pomegranate seeds, fresh and antioxidant-rich.' },
  { name: 'Grapes (Angoor)', basePrice: 100, desc: 'Sweet and seedless green grapes, juicy and fresh.' },
  { name: 'Orange (Santra)', basePrice: 120, desc: 'Citrusy sweet oranges, rich in Vitamin C and fiber.' },
];

const packSizes = [
  { suffix: '500g Pack', mult: 0.5 },
  { suffix: '1kg Pack', mult: 1.0 },
  { suffix: '2kg Family Pack', mult: 1.9 },
  { suffix: 'Premium Select', mult: 1.2 }
];

async function seedLargeDatabase() {
  console.log(`${yellow}Connecting to database for seeding 500+ products...${reset}`);
  await connectDB();

  try {
    // Clear only products collection to run profiling cleanly
    console.log(`${yellow}Clearing existing Products...${reset}`);
    await Product.deleteMany({});
    console.log(`- Products cleared: ${green}SUCCESS${reset}`);

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
              images: [`https://example.com/images/veg_${Math.floor(Math.random() * 5) + 1}.jpg`],
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
              images: [`https://example.com/images/fruit_${Math.floor(Math.random() * 5) + 1}.jpg`],
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

    console.log(`Generated ${productsToInsert.length} unique products.`);

    // Batch insert for speed
    console.log(`${yellow}Writing to database...${reset}`);
    const inserted = await Product.insertMany(productsToInsert);
    console.log(`- Seeded ${green}${inserted.length} Products${reset} successfully in MongoDB.`);

    console.log(`\n${green}★ DATABASE SEEDING FOR OPTIMIZATION COMPLETED! ★${reset}`);
  } catch (error) {
    console.error(`\n${red}✖ SEEDING ERROR: ${error.message}${reset}`);
  } finally {
    await mongoose.connection.close();
    console.log(`Database connection closed.`);
  }
}

seedLargeDatabase();
