
import axiosInstance from "@/config/axiosConfig";
import { User } from "@/types/User";

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


export async function getUser(cookieHeader: string): Promise<User> {
  try {
    const headers: Record<string, string> = {};

    if (cookieHeader) {
      headers.Cookie = cookieHeader;
    }

    const response = await axiosInstance.get<User>(
      '/api/user/getUser',
      {
        headers,
        withCredentials: true, // Still needed for credentialed requests
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
