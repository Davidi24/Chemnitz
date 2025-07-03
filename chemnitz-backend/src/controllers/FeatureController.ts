import { Request, Response } from 'express';
import { Feature } from '../models/featureModel';
import Fuse from 'fuse.js';

// --- Get all features ---
export const getAllFeatures = async (req: Request, res: Response): Promise<void> => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch features', error: error.message });
  }
};

// --- Get features by category ---
export const getFeaturesByCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryField = req.params.field;
  const categoryValue = req.params.value;

  try {
    const result = await Feature.aggregate([
      { $unwind: '$features' },
      {
        $match: {
          [`features.properties.${categoryField}`]: categoryValue
        }
      },
      {
        $project: {
          _id: 0,
          id: "$features.id",
          geometry: "$features.geometry",
          properties: "$features.properties",
          type: "$features.type",
          reviews: "$features.reviews",               // Added reviews
          averageRating: "$features.averageRating"    // Added averageRating
        }
      }
    ]);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({
      message: 'Error retrieving features by category',
      error: err.message
    });
  }
};

// --- Get feature by id ---
export const getFeatureById = async (req: Request, res: Response): Promise<void> => {
  const featureId = req.params.id;
  try {
    const result = await Feature.aggregate([
      { $unwind: '$features' },
      {
        $match: {
          'features.id': featureId
        }
      },
      {
        $project: {
          _id: 0,
          id: "$features.id",
          geometry: "$features.geometry",
          properties: "$features.properties",
          type: "$features.type",
          reviews: "$features.reviews",               // Added reviews
          averageRating: "$features.averageRating"    // Added averageRating
        }
      }
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: `Feature with id '${featureId}' not found` });
      return;
    }

    res.status(200).json(result[0]);
  } catch (error: any) {
    res.status(500).json({
      message: 'Error retrieving feature by ID',
      error: error.message
    });
  }
};

// --- Get features by fuzzy name ---
export const getFeaturesByFuzzyName = async (req: Request, res: Response): Promise<void> => {
  const searchTerm = req.params.name;

  try {
    const doc = await Feature.findOne({});
    const features: any[] = doc ? doc.features : [];

    const fuse = new Fuse(features, {
      keys: ['properties.name'],
      threshold: 0.4,
      minMatchCharLength: 1,
    });

    const result = fuse.search(searchTerm).map(item => ({
      id: item.item.id,
      name: item.item.properties.name,
    }));

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({
      message: 'Error searching features by name (fuzzy)',
      error: err.message,
    });
  }
};
