import fs from 'fs/promises';
import path from 'path';
import { Feature } from '../models/featureModel';

export async function seedFeatures() {
  const count = await Feature.countDocuments();
  if (count > 0) {
    console.log('Features already seeded.');
    return;
  }

  // Read the geojson file from the root
  const filePath = path.join(process.cwd(), 'Chemnitz.geojson');
  const fileData = await fs.readFile(filePath, 'utf-8');
  const geojson = JSON.parse(fileData);

  // Insert into MongoDB
  await Feature.create({
    type: geojson.type,
    features: geojson.features,
  });

  console.log('GeoJSON features seeded into database.');
}
