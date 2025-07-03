import { Response } from 'express';
import { UserModel } from '../models/userModel';
import { Feature } from '../models/featureModel';
import { AuthenticatedRequest } from '../types/userTypes';
import { Review } from "../models/featureModel";

export const addFavourite = async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email;
  const featureId = req.params.featureId;

  if (!email || !featureId) {
    res.status(400).json({ message: "Missing user email or featureId" });
    return;
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { $addToSet: { favourites: featureId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ message: "Failed to add favourite" });
  }
};

export const removeFavourite = async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email;
  const featureId = req.params.featureId;

  if (!email || !featureId) {
    res.status(400).json({ message: "Missing user email or featureId" });
    return;
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { $pull: { favourites: featureId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favourite" });
  }
};

export const getFavourites = async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email;

  if (!email) {
    res.status(400).json({ message: "Missing user email" });
    return;
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const favouriteIds = user.favourites;

    const favouriteFeatures = await Feature.aggregate([
      { $unwind: "$features" },
      { $match: { "features.id": { $in: favouriteIds } } },
      { $replaceRoot: { newRoot: "$features" } }
    ]);

    res.json(favouriteFeatures); 
  } catch (error) {
    res.status(500).json({ message: "Failed to get favourites" });
  }
};

export const addReviewToFeature = async (req: AuthenticatedRequest, res: Response) => {
  const userEmail = req.user?.email;
  const featureId = req.params.featureId;
  const { rating, comment } = req.body;

  if (!userEmail || !featureId || !rating || !comment) {
    res.status(400).json({ message: "Missing data (userEmail, featureId, rating, comment required)" });
    return;
  }

  try {
    const doc = await Feature.findOne({ "features.id": featureId });
    if (!doc) {
      res.status(404).json({ message: `Feature with id '${featureId}' not found` });
      return;
    }

    const feature = doc.features.find(f => f.id === featureId);
    if (!feature) {
      res.status(404).json({ message: `Feature with id '${featureId}' not found in document` });
      return;
    }

    if (!Array.isArray(feature.reviews)) feature.reviews = [];

    feature.reviews.push({
      userEmail,
      rating,
      comment,
      createdAt: new Date(),
    });

    feature.averageRating = calculateAverageRating(feature.reviews);

    await doc.save();
    res.status(201).json({
      message: "Review added.",
      reviews: feature.reviews,
      averageRating: feature.averageRating
    });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

export const deleteReviewFromFeature = async (req: AuthenticatedRequest, res: Response) => {
  const userEmail = req.user?.email;
  const featureId = req.params.featureId;

  if (!userEmail || !featureId) {
    res.status(400).json({ message: "Missing user email or featureId" });
    return;
  }

  try {
    const doc = await Feature.findOne({ "features.id": featureId });
    if (!doc) {
      res.status(404).json({ message: `Feature with id '${featureId}' not found` });
      return;
    }

    const feature = doc.features.find(f => f.id === featureId);
    if (!feature || !feature.reviews) {
      res.status(404).json({ message: "Feature or reviews not found." });
      return;
    }

    const initialLength = feature.reviews.length;
    feature.reviews = feature.reviews.filter(r => r.userEmail !== userEmail);

    if (feature.reviews.length === initialLength) {
      res.status(404).json({ message: "Review by this user not found." });
      return;
    }

    await doc.save();
    res.status(200).json({ message: "Review deleted.", reviews: feature.reviews });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete review", error: error.message });
  }
};

export const getFeatureReviews = async (req: AuthenticatedRequest, res: Response) => {
  const featureId = req.params.featureId;

  if (!featureId) {
    res.status(400).json({ message: "Missing featureId" });
    return;
  }

  try {
    const doc = await Feature.findOne({ "features.id": featureId });
    if (!doc) {
      res.status(404).json({ message: `Feature with id '${featureId}' not found` });
      return;
    }

    const feature = doc.features.find(f => f.id === featureId);
    if (!feature) {
      res.status(404).json({ message: `Feature with id '${featureId}' not found in document` });
      return;
    }

    res.json({ reviews: feature.reviews || [] });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to get reviews", error: error.message });
  }
};

function calculateAverageRating(reviews: Review[]): number | undefined {
  if (!reviews || reviews.length === 0) return undefined;
  const sum = reviews.reduce((acc, r) => acc + (typeof r.rating === "number" ? r.rating : 0), 0);
  return +(sum / reviews.length).toFixed(2);
}
