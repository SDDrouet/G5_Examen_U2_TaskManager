// controllers/listController.ts
import { List, Task } from '../models/taskModel';

let lists: List[] = [];
let nextListId = 1;
let nextTaskId = 1;

export const getLists = (): List[] => {
    return lists;
};

export const getListById = (id: number): List | undefined => {
    return lists.find(list => list.id === id);
};

export const addList = (nombre: string): List => {
    console.log("addList");
    const newList: List = { id: nextListId++, nombre, tareas: [] };
    lists.push(newList);
    return newList;
};

export const updateList = (id: number, nombre: string): List | null => {
    const list = lists.find(l => l.id === id);
    if (list) {
        list.nombre = nombre;
        return list;
    }
    return null;
};

export const deleteList = (id: number): boolean => {
    const index = lists.findIndex(l => l.id === id);
    if (index !== -1) {
        lists.splice(index, 1);
        return true;
    }
    return false;
};

export const addTask = (listId: number, nombre: string, descripcion: string, fechaLimite: string): Task | null => {
    console.log("addTask");
    const list = lists.find(l => l.id === listId);
    if (list) {
        const newTask: Task = { id: nextTaskId++, nombre, descripcion, fechaLimite, realizado: false };
        list.tareas.push(newTask);
        return newTask;
    }
    return null;
};

export const updateTask = (listId: number, taskId: number, updates: Partial<Task>): Task | null => {
    const list = lists.find(l => l.id === listId);
    if (list) {
        const task = list.tareas.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updates);
            return task;
        }
    }
    return null;
};

export const deleteTask = (listId: number, taskId: number): boolean => {
    const list = lists.find(l => l.id === listId);
    if (list) {
        const index = list.tareas.findIndex(t => t.id === taskId);
        if (index !== -1) {
            list.tareas.splice(index, 1);
            return true;
        }
    }
    return false;
};

export const toggleTaskStatus = (listId: number, taskId: number): Task | null => {
    const list = lists.find(l => l.id === listId);
    if (list) {
        const task = list.tareas.find(t => t.id === taskId);
        if (task) {
            task.realizado = !task.realizado;
            return task;
        }
    }
    return null;
};