import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Product from './models/Product.js';

const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

// Helper to recursively collect all stages in the winning plan
function getPlanStages(plan) {
  const stages = [];
  function traverse(node) {
    if (!node) return;
    if (typeof node !== 'object') return;
    if (node.stage) stages.push(node.stage);
    for (const key in node) {
      if (node.hasOwnProperty(key) && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }
  traverse(plan);
  return stages;
}

async function profileDatabaseQueries() {
  console.log(`${yellow}Connecting to database for query profiling...${reset}`);
  await connectDB();

  try {
    const totalProducts = await Product.countDocuments();
    console.log(`Total Products in Database: ${green}${totalProducts}${reset}`);

    if (totalProducts < 500) {
      console.log(`${red}Warning: Database contains only ${totalProducts} products. Seeding more is recommended for accurate performance data.${reset}`);
    }

    // ==========================================
    // STEP 1: Profile BEFORE custom indexing
    // ==========================================
    console.log(`\n${yellow}[Step 1] Dropping custom indexes to test raw state...${reset}`);
    try {
      await Product.collection.dropIndexes();
      console.log(`- Dropped custom indexes: ${green}SUCCESS${reset} (Only default _id index remains)`);
    } catch (e) {
      console.log(`- Drop indexes note: ${e.message}`);
    }

    console.log(`\n${yellow}Profiling filter & sort query BEFORE indexing...${reset}`);
    console.log(`Query: Product.find({ category: 'Fruits' }).sort({ price: 1 })`);
    
    const explainBefore = await Product.find({ category: 'Fruits' })
      .sort({ price: 1 })
      .explain('executionStats');

    const statsBefore = explainBefore.executionStats;
    const stagesBefore = getPlanStages(explainBefore.queryPlanner.winningPlan);

    console.log(`- Scan Types Found: ${red}${stagesBefore.join(' -> ')}${reset}`);
    console.log(`- Execution Time: ${statsBefore.executionTimeMillis} ms`);
    console.log(`- Total Documents Examined: ${statsBefore.totalDocsExamined}`);
    console.log(`- Total Documents Returned: ${statsBefore.nReturned}`);


    // ==========================================
    // STEP 2: Profile AFTER custom indexing
    // ==========================================
    console.log(`\n${yellow}[Step 2] Building custom compound and text indexes...${reset}`);
    console.log(`- Compound Index: { category: 1, price: 1 }`);
    console.log(`- Text Index: { name: 'text', description: 'text' }`);
    
    console.time('Index build time');
    // Force mongoose to sync indexes based on model config
    await Product.createIndexes();
    console.timeEnd('Index build time');
    console.log(`- Indexes built: ${green}SUCCESS${reset}`);

    console.log(`\n${yellow}Profiling filter & sort query AFTER indexing...${reset}`);
    console.log(`Query: Product.find({ category: 'Fruits' }).sort({ price: 1 })`);

    const explainAfter = await Product.find({ category: 'Fruits' })
      .sort({ price: 1 })
      .explain('executionStats');

    const statsAfter = explainAfter.executionStats;
    const stagesAfter = getPlanStages(explainAfter.queryPlanner.winningPlan);

    console.log(`- Scan Types Found: ${green}${stagesAfter.join(' -> ')}${reset}`);
    console.log(`- Execution Time: ${statsAfter.executionTimeMillis} ms`);
    console.log(`- Total Documents Examined: ${statsAfter.totalDocsExamined}`);
    console.log(`- Total Documents Returned: ${statsAfter.nReturned}`);


    // ==========================================
    // STEP 3: Profile TEXT SEARCH query
    // ==========================================
    console.log(`\n${yellow}[Step 3] Profiling Text Search query with indexes...${reset}`);
    console.log(`Query: Product.find({ $text: { $search: 'Organic Mango' } })`);

    const explainText = await Product.find({ $text: { $search: 'Organic Mango' } })
      .explain('executionStats');

    const statsText = explainText.executionStats;
    const stagesText = getPlanStages(explainText.queryPlanner.winningPlan);

    console.log(`- Scan Types Found: ${green}${stagesText.join(' -> ')}${reset}`);
    console.log(`- Execution Time: ${statsText.executionTimeMillis} ms`);
    console.log(`- Total Keys Examined (Index): ${statsText.totalKeysExamined || 0}`);
    console.log(`- Total Documents Examined: ${statsText.totalDocsExamined}`);
    console.log(`- Total Documents Returned: ${statsText.nReturned}`);


    // ==========================================
    // PRINT COMPARISON REPORT
    // ==========================================
    console.log(`\n=============================================================`);
    console.log(`${green}★ QUERY PERFORMANCE COMPARISON REPORT ★${reset}`);
    console.log(`=============================================================`);
    console.log(`Metric                   | Unindexed (COLLSCAN) | Indexed (IXSCAN)`);
    console.log(`-------------------------|----------------------|-------------------`);
    console.log(`Primary Query Scan       | ${red}${'COLLSCAN'.padEnd(20)}${reset} | ${green}${'IXSCAN (FETCH)'.padEnd(17)}${reset}`);
    console.log(`In-Memory Sort Stage     | ${red}${'SORT (Needed)'.padEnd(20)}${reset} | ${green}${'None (Presorted)'.padEnd(17)}${reset}`);
    console.log(`Execution Time (ms)      | ${red}${`${statsBefore.executionTimeMillis} ms`.padEnd(20)}${reset} | ${green}${`${statsAfter.executionTimeMillis} ms`.padEnd(17)}${reset}`);
    console.log(`Docs Examined            | ${red}${`${statsBefore.totalDocsExamined}`.padEnd(20)}${reset} | ${green}${`${statsAfter.totalDocsExamined}`.padEnd(17)}${reset}`);
    console.log(`Docs Returned            | ${statsBefore.nReturned.toString().padEnd(20)} | ${statsAfter.nReturned.toString().padEnd(17)}`);
    
    const ratio = statsBefore.totalDocsExamined / (statsAfter.totalDocsExamined || 1);
    console.log(`-------------------------------------------------------------`);
    console.log(`Efficiency Gain: Database examined ${green}${ratio.toFixed(1)}x fewer documents${reset} during queries!`);
    console.log(`=============================================================`);

  } catch (error) {
    console.error(`\n${red}✖ PROFILING ERROR: ${error.message}${reset}`);
    console.error(error.stack);
  } finally {
    await mongoose.connection.close();
    console.log(`\nDatabase connection closed.`);
  }
}

profileDatabaseQueries();
