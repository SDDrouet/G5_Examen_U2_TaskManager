// controllers/registerController.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, message: data.message };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: 'Error en el registro. Por favor, inténtelo de nuevo.' };
    }
};
