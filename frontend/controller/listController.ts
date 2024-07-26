// controllers/listController.ts
import { List, Task } from '../models/taskModel';

const API_URL = 'http://localhost:5000/users';  // Ajusta esta URL según tu configuración

// Función para obtener el ID del usuario actual
const USER_ID = 1;
export const getLists = async (userId: number = getCurrentUserId()): Promise<List[]> => {
    const response = await fetch(`${API_URL}/${userId}/lists`);
    if (!response.ok) throw new Error('Failed to fetch lists');
    return response.json();
};

export const getListById = async (id: number, userId: number = getCurrentUserId()): Promise<List | undefined> => {
    const response = await fetch(`${API_URL}/${userId}/lists/${id}`);
    if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Failed to fetch list');
    }
    return response.json();
};

export const addList = async (nombre: string, userId: number = getCurrentUserId()): Promise<List> => {
    const response = await fetch(`${API_URL}/${userId}/lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, tareas: [] })
    });
    if (!response.ok) throw new Error('Failed to add list');
    return response.json();
};

export const updateList = async (id: number, nombre: string, userId: number = getCurrentUserId()): Promise<List | null> => {
    const response = await fetch(`${API_URL}/${userId}/lists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to update list');
    }
    return response.json();
};

export const deleteList = async (id: number, userId: number = getCurrentUserId()): Promise<boolean> => {
    const response = await fetch(`${API_URL}/${userId}/lists/${id}`, {
        method: 'DELETE'
    });
    return response.ok;
};

export const addTask = async (listId: number, nombre: string, descripcion: string, fechaLimite: string, userId: number = getCurrentUserId()): Promise<Task | null> => {
    const response = await fetch(`${API_URL}/${userId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion, fechaLimite, realizado: false })
    });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to add task');
    }
    return response.json();
};

export const updateTask = async (listId: number, taskId: number, updates: Partial<Task>, userId: number = getCurrentUserId()): Promise<Task | null> => {
    const response = await fetch(`${API_URL}/${userId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to update task');
    }
    return response.json();
};

export const deleteTask = async (listId: number, taskId: number, userId: number = getCurrentUserId()): Promise<boolean> => {
    const response = await fetch(`${API_URL}/${userId}/tasks/${taskId}`, {
        method: 'DELETE'
    });
    return response.ok;
};

export const toggleTaskStatus = async (listId: number, taskId: number, userId: number = getCurrentUserId()): Promise<Task | null> => {
    const task = await getTaskById(taskId, userId);
    if (task) {
        return updateTask(listId, taskId, { realizado: !task.realizado }, userId);
    }
    return null;
};

// Función auxiliar para obtener una tarea por su ID
const getTaskById = async (taskId: number, userId: number = getCurrentUserId()): Promise<Task | null> => {
    const lists = await getLists(userId);
    for (const list of lists) {
        const task = list.tareas.find(t => t.id === taskId);
        if (task) return task;
    }
    return null;
};