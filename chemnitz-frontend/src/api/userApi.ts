'us'
import axiosInstance from "@/config/axiosConfig";
import { User } from "@/types/User";
import { FeatureItem, Review } from "@/types/FeatueType";

export async function registerUser(name: string, email: string, password: string): Promise<User> {
  try {
    const response = await axiosInstance.post<User>(
      '/api/user/register',
      {name, email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(cookie?: string): Promise<User> {
  try {
    const response = await axiosInstance.get<User>(
      '/api/user/getUser',
      {
        headers: {
          Cookie: `access-token=${cookie}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function addFavourite(featureId: string): Promise<string[]> {
  const response = await axiosInstance.post<{ favourites: string[] }>(
    `/api/user/favourites/add/${encodeURIComponent(featureId)}`,
    {},
    { withCredentials: true }
  );
  return response.data.favourites;
}

export async function removeFavourite(featureId: string): Promise<string[]> {
  const response = await axiosInstance.post<{ favourites: string[] }>(
    `/api/user/favourites/remove/${encodeURIComponent(featureId)}`,
    {},
    { withCredentials: true }
  );
  return response.data.favourites;
}

export async function getFavourites(): Promise<FeatureItem[]> {
  const response = await axiosInstance.get<FeatureItem[]>(
    '/api/user/getUser/favourites',
    { withCredentials: true }
  );
  return response.data;
}

export async function addReviewToFeature(
  featureId: string,
  rating: number,
  comment: string
): Promise<{ message: string; reviews: Review[]; averageRating: number }> {
  const response = await axiosInstance.post<{
    message: string;
    reviews: Review[];
    averageRating: number;
  }>(
    `/api/user/features/${encodeURIComponent(featureId)}/review`,
    { rating, comment },
    { withCredentials: true }
  );
  return response.data;
}

export async function deleteReviewFromFeature(featureId: string): Promise<
{
  message: string;
  reviews: Review[];
}> {
  const response = await axiosInstance.delete<{
    message: string;
    reviews: Review[];
  }>(
    `/api/user/features/${encodeURIComponent(featureId)}/review`,
    { withCredentials: true }
  );
  return response.data;
}

export async function getFeatureReviews(featureId: string): Promise<Review[]> {
  const response = await axiosInstance.get<{ reviews: Review[] }>(
    `/api/user/features/${encodeURIComponent(featureId)}/reviews`
  );
  return response.data.reviews;
}


export async function updateUser(body: Partial<User>): Promise<User | null> {
  try {
    const response = await axiosInstance.patch<User>(
      `api/user/profile`,
      body,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('unauthorized');
    }
    return null;
  }
}