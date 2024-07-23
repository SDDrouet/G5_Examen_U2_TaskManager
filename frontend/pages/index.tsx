// pages/index.tsx
import React from 'react';
import Link from 'next/link';

require('dotenv').config()

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
            <div className="flex space-x-4">
                <Link className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" href="/login">
                    Login
                </Link>
                <Link className="px-4 py-2 bg-green-500 text-white rounded-md  hover:bg-green-600" href="/register">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
