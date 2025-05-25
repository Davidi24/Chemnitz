import axiosInstance from "@/config/axiosConfig";
import { User } from "@/types/User";

export async function loginUser(email: string, password: string): Promise<User> {
    try {
        const response = await axiosInstance.post<User>(
            '/api/auth/login',
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

// to do
export async function logoutUser() {
    try {
        const response = await axiosInstance.post(
            '/api/auth/logout',
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}


