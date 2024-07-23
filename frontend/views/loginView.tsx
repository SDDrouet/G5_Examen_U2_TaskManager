// views/loginView.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import User from '../models/user';

interface LoginViewProps {
    onLogin: (email: string, password: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='absolute top-4 left-4'>
                <Link href="/">
                    <div className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Regresar al inicio
                    </div>
                </Link>
            </div>

            
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 font-bold">Login</button>
                </form>

                <div id="incorrectCredential" className="text-red-600 text-center mt-4 font-bold"></div>
                
                <div className='text-center'>
                    <Link className="text-blue-500 hover:text-blue-700 text-center" href="/register">
                        No tienes cuenta? Regístrate
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
