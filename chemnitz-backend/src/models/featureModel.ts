import mongoose, { Schema, Document } from 'mongoose';

export interface FeatureProperties {
  [key: string]: string | number | boolean | null;
}

export interface FeatureGeometry {
  type: 'Point' | 'LineString' | 'Polygon';
  coordinates: number[];
}

export interface IFeature extends Document {
  type: 'Feature';
  id: string;
  properties: FeatureProperties;
  geometry: FeatureGeometry;
}

const featureSchema = new Schema<IFeature>({
  type: { type: String, default: 'Feature' },
  id: { type: String, required: true },
  properties: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point', 'LineString', 'Polygon'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export const Feature = mongoose.model<IFeature>('Feature', featureSchema);
