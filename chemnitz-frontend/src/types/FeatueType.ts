export interface FeatureProperties {
  [key: string]: any;
  name?: string;
  tourism?: string;
  amenity?: string;
  description?: string;
  image?: string;
  rating?: number;
}

export interface FeatureGeometry {
  type: string;
  coordinates: [number, number];
}

export interface FeatureItem {
  id: string;
  type: string;
  properties: FeatureProperties;
  geometry: FeatureGeometry;
  reviews?: Review[];
  averageRating?: number;
}

export interface Review {
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

