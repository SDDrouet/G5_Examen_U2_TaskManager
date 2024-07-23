import { promises as fs } from 'fs';
import { User } from '../models/User';
const bcrypt = require('bcrypt');

const dataFile = 'users.json';

export async function readUsers(): Promise<User[]> {
    try {
        const data = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function writeUsers(users: User[]): Promise<void> {
    await fs.writeFile(dataFile, JSON.stringify(users, null, 2));
}

export async function getUserById(id: number): Promise<User | undefined> {
    const users = await readUsers();
    return users.find(u => u.id === id);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const users = await readUsers();
    return users.find(u => u.email === email);
}

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const users = await readUsers();
    const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...userData,
        password: hashedPassword
    };
    users.push(newUser);
    await writeUsers(users);
    return newUser;
}

export async function updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const users = await readUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        await writeUsers(users);
        return users[index];
    }
    return null;
}

export async function deleteUser(id: number): Promise<boolean> {
    let users = await readUsers();
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    if (users.length < initialLength) {
        await writeUsers(users);
        return true;
    }
    return false;
}

// New function to handle login
export async function loginUser(email: string, password: string): Promise<User | null> {
    const user = await getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
}
