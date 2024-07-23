// pages/register.tsx
import React from 'react';
import RegisterView from '../views/registerView';
import { register } from '../controller/registerController';

const RegisterPage: React.FC = () => {
    const handleRegister = (name: string, email: string, password: string) => {
        const newUser = register(name, email, password);
        alert(`User registered: ${newUser.name}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <RegisterView onRegister={handleRegister} />
        </div>
    );
};

export default RegisterPage;
