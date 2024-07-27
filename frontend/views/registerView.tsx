// views/registerView.tsx
import Link from 'next/link';
import React, { useState } from 'react';
import { register } from '../controller/registerController'; // Asegúrate de que el nombre del directorio sea correcto
import { useRouter } from 'next/router';
import Image from 'next/image';

const RegisterView: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const result = await register(name, email, password);

        if (result.success) {
            alert('Usuario registrado con éxito');
            router.push('/login');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className="absolute top-4 right-4">
                <Image
                    src="/Logo2.png" // Ruta del logo en la carpeta public
                    alt="Logo"
                    width={100} // Ajusta el tamaño del logo según tus necesidades
                    height={100}
                />
            </div>
            <div className='absolute top-4 left-4'>
                <Link href="/">
                    <div className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Regresar al inicio
                    </div>
                </Link>
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold">¡Registrate ahora!</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-bold">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterView;
