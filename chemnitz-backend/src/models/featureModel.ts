import mongoose, { Document, Schema, Model } from 'mongoose';

export interface Review {
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// 2. FeatureItem Interface
export interface FeatureItem {
  type: string;
  id: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: number[];
  };
  reviews?: Review[];
  averageRating?: number;
}

// 3. FeatureDocument Interface
export interface FeatureDocument extends Document {
  type: string;
  features: FeatureItem[];
}

// 4. Review Schema
const ReviewSchema = new Schema<Review>(
  {
    userEmail: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// 5. FeatureItem Schema
const FeatureItemSchema = new Schema<FeatureItem>(
  {
    type: { type: String, required: true },
    id: { type: String, required: true },
    properties: { type: Schema.Types.Mixed, required: true },
    geometry: {
      type: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    reviews: { type: [ReviewSchema], default: [] },
    averageRating: { type: Number, default: null },
  },
  { _id: false }
);

// 6. Feature Schema
const FeatureSchema = new Schema<FeatureDocument>({
  type: { type: String, required: true },
  features: { type: [FeatureItemSchema], default: [] },
});

// 7. Model Export
export const Feature: Model<FeatureDocument> =
  mongoose.models.Feature || mongoose.model<FeatureDocument>('Feature', FeatureSchema);
