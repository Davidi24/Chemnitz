import axiosInstance from '@/config/axiosConfig';
import { categoryMap } from '@/data/FeatureData';
import { FeatureItem } from '@/types/FeatueType';

// Fetch features by category
export async function getFeaturesByCategory(category: string): Promise<FeatureItem[]> {
  const field = categoryMap[category];
  if (!field) {
    throw new Error(`Unknown category: ${category}`);
  }
  try {
    const response = await axiosInstance.get<FeatureItem[]>(`/feature/category/${field}/${category}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching features by category:', error?.response?.data || error.message || error);
    return [];
  }
}

export interface PlaceSuggestion {
  id: string;
  name: string;
}

export async function getFuzzyNameSuggestions(name: string): Promise<PlaceSuggestion[]> {
  try {
    const response = await axiosInstance.get<PlaceSuggestion[]>(`/feature/fuzzy-name/${encodeURIComponent(name)}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error('Error fetching fuzzy name suggestions:', error?.response?.data || error.message || error);
    return [];
  }
}

export async function getFeatureById(id: string): Promise<FeatureItem | null> {
  try {
    const response = await axiosInstance.get<FeatureItem>(`/feature/id/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching feature by ID:', error?.response?.data || error.message || error);
    return null;
  }
}

export async function getFavourites(): Promise<FeatureItem[]> {
  try {
    const response = await axiosInstance.get<FeatureItem[]>(`api/user/favourites`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('unauthorized');
    }
    return [];
  }
}



