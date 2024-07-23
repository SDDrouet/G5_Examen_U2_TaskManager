// pages/login.tsx
import React from 'react';
import { useRouter } from 'next/router'; // Importa useRouter
import LoginView from '../views/loginView';
import { login } from '../controller/loginController';

const LoginPage: React.FC = () => {
    const router = useRouter(); // Inicializa useRouter

    const handleLogin = async (email: string, password: string) => {
        const user = await login(email, password);
        if (user) {
            router.push('/task'); // Redirige al usuario a /tabla en caso de éxito
        } else {
            console.log('Login failed');
            const incorrectCredential = document.getElementById('incorrectCredential');
            if (incorrectCredential) {
                incorrectCredential.textContent = 'Credenciales incorrectas';
            }
            // Aquí podrías mostrar un mensaje de error en el componente LoginView si quieres
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <LoginView onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;
