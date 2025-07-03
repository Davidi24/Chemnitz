import mongoose from 'mongoose';
import { Feature } from '../models/featureModel';
import fs from 'fs/promises';
import path from 'path';

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

export async function connectDB(): Promise<void> {
  try {
    if (!MONGO_URI) {
      console.error('Please provide the Mongo URI');
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections({ name: 'features' }).toArray();
      if (collections.length === 0) {
        await Feature.createCollection();
        console.log('Feature collection created successfully');
        await seedFeatures();
      } else {
        console.log('Feature collection already exists');
      }
    }

  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
