#!/usr/bin/env node

import seedDatabase from '../utils/seed.js';
import process from 'process';

const runSeed = async () => {
  try {
    console.log('🌱 Running database seed script...\n');
    await seedDatabase();
    console.log('\n✅ Seed script completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed script failed:', error);
    process.exit(1);
  }
};

runSeed();