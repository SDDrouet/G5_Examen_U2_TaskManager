// controllers/loginController.ts
import User from '../models/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const user: User | null = await response.json();
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
