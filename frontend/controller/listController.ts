// controllers/listController.ts
import { List, Task } from '../models/taskModel';

let lists: List[] = [];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserName = async(): Promise<string> => {
    const userName: string = JSON.parse(localStorage.getItem('user') || '{}').nombre;
    console.log("usuario:" + userName);
    return userName;
}

export const getLists = async(): Promise<List[] | null> => {    
    try {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        const response = await fetch(`${API_URL}/users/${userId}/lists`);
        lists = await response.json();
        return lists;
    } catch (error) {
        return null;
    }
};

export const getListById = (id: number): List | undefined => {
    return lists.find(list => list.id === id);
};

export const addList = async (nombre: string): Promise<List> => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const response = await fetch(`${API_URL}/users/${userId}/lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, "tareas": [] }),
    });
    if (!response.ok) {
        throw new Error('Error adding list');
    }
    return response.json();
};

export const updateList = async (listId: number, nombre: string): Promise<List> => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const response = await fetch(`${API_URL}/users/${userId}/lists/${listId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
        throw new Error('Error updating list');
    }
    return response.json();
};

export const deleteList = async (listId: number): Promise<boolean> => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const response = await fetch(`${API_URL}/users/${userId}/lists/${listId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        return false;
    }
    return true;
};

export const addTask = async (listId: number, nombre: string, descripcion: string, fechaLimite: string): Promise<Task> => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const response = await fetch(`${API_URL}/users/${userId}/lists/${listId}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, descripcion, fechaLimite }),
    });
    if (!response.ok) {
        throw new Error('Error adding task');
    }
    return response.json();
};


export const updateTask = async (listId: number, taskId: number, updates: Partial<Task>): Promise<Task> => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const response = await fetch(`${API_URL}/users/${userId}/lists/${listId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error('Error updating task');
    }
    return response.json();
};


export const toggleTaskStatus = async (listId: number, taskId: number): Promise<Task | null> => {
    try {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        const response = await fetch(`${API_URL}/users/${userId}/lists/${listId}/tasks/${taskId}/toggle`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Error updating task');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const deleteTask = async (listId: number, taskId: number): Promise<boolean> => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const response = await fetch(`${API_URL}/users/${userId}/lists/${listId}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        return false;
    }
    return true;
};