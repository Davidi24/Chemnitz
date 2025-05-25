
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