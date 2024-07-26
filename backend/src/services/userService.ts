// services/userService.ts
import { promises as fs } from 'fs';
import { User } from '../models/User';
import { Task, List } from '../models/TaskModel'; 
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

export async function createUser(userData: Omit<User, 'id'>): Promise<boolean> {
    console.log("Creando usuario");
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
        return false;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const users = await readUsers();
    const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...userData,
        password: hashedPassword,
        lists: []
    };
    users.push(newUser);
    await writeUsers(users);
    return true;
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

// Función para el login
export async function loginUser(email: string, password: string): Promise<User | null> {
    const user = await getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
}

// Función para obtener todas las tareas de un usuario
export async function getTasks(userId: number): Promise<Task[]> {
    const user = await getUserById(userId);
    if (user) {
        return user.lists.flatMap(list => list.tareas);
    }
    return [];
}

// Función para agregar una tarea a un usuario
export async function addTaskToList(userId: number, listId: number, task: Task): Promise<User | null> {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        const list = user.lists.find(list => list.id === listId);
        if (list) {
            task.id = list.tareas.length > 0 ? Math.max(...list.tareas.map(l => l.id)) + 1 : 1;
            task.realizado = false
            list.tareas.push(task);
            await writeUsers(users);
            return user;
        }
    }
    return null;
}

// Función para actualizar una tarea de un usuario
export async function updateTask(userId: number, listId: number, taskId: number, updatedTask: Partial<Task>): Promise<User | null> {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        const list = user.lists.find(list => list.id === listId);
        if (list) {
            const taskIndex = list.tareas.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                list.tareas[taskIndex] = { ...list.tareas[taskIndex], ...updatedTask };
                await writeUsers(users);
                return user;
            }
        }
    }
    return null;
}

// Función para actualizar una tarea de un usuario
export async function toggleTaskStatus(userId: number, listId: number, taskId: number): Promise<User | null> {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        const list = user.lists.find(list => list.id === listId);
        if (list) {
            const taskIndex = list.tareas.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                list.tareas[taskIndex].realizado = !list.tareas[taskIndex].realizado;
                await writeUsers(users);
                return user;
            }
        }
    }
    return null;
}

// Función para eliminar una tarea de un usuario
export async function deleteTask(userId: number, listId: number, taskId: number): Promise<User | null> {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        const list = user.lists.find(list => list.id === listId);
        if (list) {
            list.tareas = list.tareas.filter(task => task.id !== taskId);
            await writeUsers(users);
            return user;
        }
    }
    return null;
}

// Función para obtener todas las listas de un usuario
export async function getLists(userId: number): Promise<List[]> {
    const user = await getUserById(userId);
    if (user) {
        return user.lists;
    }
    return [];
}

// Función para obtener una lista específica de un usuario
export async function getListById(userId: number, listId: number): Promise<List | null> {
    const user = await getUserById(userId);
    if (user) {
        return user.lists.find(list => list.id === listId) || null;
    }
    return null;
}

// Función para agregar una lista a un usuario
export async function addList(userId: number, list: List): Promise<User | null> {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        list.id = user.lists.length > 0 ? Math.max(...user.lists.map(l => l.id)) + 1 : 1;
        user.lists.push(list);
        await writeUsers(users);
        return user;
    }
    return null;
}

// Función para actualizar una lista de un usuario
export async function updateList(userId: number, listId: number, updatedList: Partial<List>): Promise<User | null> {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        const listIndex = user.lists.findIndex(list => list.id === listId);
        if (listIndex !== -1) {
            user.lists[listIndex] = { ...user.lists[listIndex], ...updatedList };
            await writeUsers(users);
            return user;
        }
    }
    return null;
}

// Función para eliminar una lista de un usuario
export async function deleteList(userId: number, listId: number): Promise<User | null> {
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const user = users[userIndex];
        user.lists = user.lists.filter(list => list.id !== listId);
        await writeUsers(users);
        return user;
    }
    return null;
}

