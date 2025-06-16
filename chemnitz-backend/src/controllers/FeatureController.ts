import { Request, Response } from 'express';
import { Feature } from '../models/featureModel';

export const getFeaturesByCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.categoryId;

  const categoryMap: Record<string, string> = {
    restaurant: 'amenity',
    museum: 'tourism',
    park: 'leisure',
    school: 'amenity',
    hotel: 'tourism',
    gallery: 'tourism',
    bench: 'amenity',
    theatre: 'amenity',
  };

  const propertyField = categoryMap[categoryId];

  if (!propertyField) {
    res.status(400).json({ message: 'Unsupported category' });
    return;
  }

  try {
    const result = await Feature.aggregate([
      { $unwind: '$features' },
      { $match: { [`features.properties.${propertyField}`]: categoryId } },
      { $replaceRoot: { newRoot: '$features' } }
    ]);

    res.json(result);
  } catch (err: unknown) {
    res.status(500).json({
      message: 'Error fetching features',
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
