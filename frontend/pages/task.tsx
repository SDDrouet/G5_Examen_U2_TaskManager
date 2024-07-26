// pages/index.tsx
import { useState, useEffect } from 'react';
import ListView from '../views/listView';
import { getLists, addList, updateList, deleteList, addTask, updateTask, deleteTask, toggleTaskStatus } from '../controller/listController';
import { List, Task } from '../models/taskModel';
import withAuth from '../controller/withAuth';

const Home = () => {
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const fetchedLists = await getLists();
                setLists(fetchedLists);
            } catch (error) {
                console.error("Failed to fetch lists:", error);
            }
        };
        fetchLists();
    }, []);

    const handleAddList = async (nombre: string) => {
        if (nombre.trim() === '') return;
        try {
            const newList = await addList(nombre);
            setLists(prevLists => [...prevLists, newList]);
        } catch (error) {
            console.error("Failed to add list:", error);
        }
    };

    const handleUpdateList = async (id: number, nombre: string) => {
        try {
            const updatedList = await updateList(id, nombre);
            if (updatedList) {
                setLists(lists.map(list => list.id === id ? updatedList : list));
            }
        } catch (error) {
            console.error("Failed to update list:", error);
        }
    };

    const handleDeleteList = async (id: number) => {
        try {
            const success = await deleteList(id);
            if (success) {
                setLists(lists.filter(list => list.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete list:", error);
        }
    };

    const handleAddTask = async (listId: number, nombre: string, descripcion: string, fechaLimite: string) => {
        if (nombre.trim() === '') return;
        try {
            const newTask = await addTask(listId, nombre, descripcion, fechaLimite);
            if (newTask) {
                setLists(lists.map(list => 
                    list.id === listId 
                        ? { ...list, tareas: [...list.tareas, newTask] }
                        : list
                ));
            }
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const handleUpdateTask = async (listId: number, taskId: number, updates: Partial<Task>) => {
        try {
            const updatedTask = await updateTask(listId, taskId, updates);
            if (updatedTask) {
                setLists(lists.map(list => 
                    list.id === listId 
                        ? { ...list, tareas: list.tareas.map(task => task.id === taskId ? updatedTask : task) }
                        : list
                ));
            }
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const handleDeleteTask = async (listId: number, taskId: number) => {
        try {
            const success = await deleteTask(listId, taskId);
            if (success) {
                setLists(lists.map(list => 
                    list.id === listId 
                        ? { ...list, tareas: list.tareas.filter(task => task.id !== taskId) }
                        : list
                ));
            }
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleToggleTaskStatus = async (listId: number, taskId: number) => {
        try {
            const updatedTask = await toggleTaskStatus(listId, taskId);
            if (updatedTask) {
                setLists(lists.map(list => 
                    list.id === listId 
                        ? { ...list, tareas: list.tareas.map(task => task.id === taskId ? updatedTask : task) }
                        : list
                ));
            }
        } catch (error) {
            console.error("Failed to toggle task status:", error);
        }
    };

    return (
        <ListView
            lists={lists}
            onAddList={handleAddList}
            onUpdateList={handleUpdateList}
            onDeleteList={handleDeleteList}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleTaskStatus={handleToggleTaskStatus}
        />
    );
}

export default withAuth(Home);