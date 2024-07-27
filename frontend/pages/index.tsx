// pages/index.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';  // Asegúrate de importar el componente Image

require('dotenv').config()

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Bienvenido a Gestor de Tareas</h1>
            <div className="absolute top-4 right-4">
                <Image
                    src="/Logo2.png" // Ruta del logo en la carpeta public
                    alt="Logo"
                    width={100} // Ajusta el tamaño del logo según tus necesidades
                    height={100}
                />
            </div>
            
            
            <div className="flex space-x-4">
                <Link className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" href="/login">
                    Iniciar Sesión
                </Link>
                <Link className="px-4 py-2 bg-green-500 text-white rounded-md  hover:bg-green-600" href="/register">
                    Registrarse
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
