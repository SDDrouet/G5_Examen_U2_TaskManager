// controllers/loginController.ts
import User from '../models/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string): Promise<{ user: User | null; token: string | null }> => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            return { user: data.user, token: data.token };
        } else {
            return { user: null, token: null };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { user: null, token: null };
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};