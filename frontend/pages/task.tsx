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
                if (fetchedLists) {
                    setLists(fetchedLists);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLists();
    }, []);

    const handleAddList = async (nombre: string) => {
        try {
            if (nombre.trim() === '') return; // Evita añadir listas vacías
            const newList = await addList(nombre);
            setLists([...lists, newList]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateList = async (id: number, nombre: string) => {
        try {
            const updatedList = await updateList(id, nombre);
            if (updatedList) {
                setLists(lists.map(list => list.id === id ? updatedList : list));
            }
        } catch (error) {
            console.error(error);

        }
    };

    
    const handleDeleteList = async (id: number) => {
        try {
            setLists(lists.filter(list => list.id !== id));
            await deleteList(id);

        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = async (listId: number, nombre: string, descripcion: string, fechaLimite: string) => {
        if (nombre.trim() === '') return;
        const newTask = await addTask(listId, nombre, descripcion, fechaLimite);
        if (newTask) {
            setLists(lists.map(list => {
                if (list.id === listId) {
                    if (list.tareas.some(task => task.nombre === nombre)) {
                        return list; // No añadas tareas duplicadas
                    }
                    return { ...list, tareas: [...list.tareas, newTask] };
                } else {
                    return list;
                }
            }));
        }
    };

    const handleUpdateTask = async (listId: number, taskId: number, updates: Partial<Task>) => {
        const updatedTask = await updateTask(listId, taskId, updates);
        if (updatedTask) {
            setLists(lists.map(list =>
                list.id === listId
                    ? { ...list, tareas: list.tareas.map(task => task.id === taskId ? updatedTask : task) }
                    : list
            ));
        }
    };

    const handleToggleTaskStatus = async (listId: number, taskId: number) => {
        const updatedTask = await toggleTaskStatus(listId, taskId);
        if (updatedTask) {
            setLists(lists.map(list =>
                list.id === listId
                    ? { ...list, tareas: list.tareas.map(task => task.id === taskId ? updatedTask : task) }
                    : list
            ));
        }
    };

    const handleDeleteTask = async (listId: number, taskId: number) => {
        try {
            setLists(lists.map(list =>
                list.id === listId
                    ? { ...list, tareas: list.tareas.filter(task => task.id !== taskId) }
                    : list
            ));
            await deleteTask(listId, taskId);

        } catch (error) {
            console.error(error);
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