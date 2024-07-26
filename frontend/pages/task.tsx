// pages/index.tsx
import { useState } from 'react';
import ListView from '../views/listView';
import { getLists, addList, updateList, deleteList, addTask, updateTask, deleteTask, toggleTaskStatus} from '../controller/listController';
import { List, Task } from '../models/taskModel';
import withAuth from '../controller/withAuth';



const Home= ()=> {
    const [lists, setLists] = useState<List[]>(getLists());

    const handleAddList = (nombre: string) => {
        if (nombre.trim() === '') return; // Evita añadir listas vacías
        const newList = addList(nombre);
        setLists(prevLists => {        lists
            // Comprueba si ya existe una lista con este nombre
            if (prevLists.some(list => list.id === newList.id)) {                
                return prevLists; // No añadas duplicados
            }
            return [...prevLists, newList];
        });
    };

    const handleUpdateList = (id: number, nombre: string) => {
        const updatedList = updateList(id, nombre);
        if (updatedList) {
            setLists(lists.map(list => list.id === id ? updatedList : list));
        }
    };

    const handleDeleteList = (id: number) => {
        if (deleteList(id)) {
            setLists(lists.filter(list => list.id !== id));
        }
    };

    const handleAddTask = (listId: number, nombre: string, descripcion: string, fechaLimite: string) => {
        if (nombre.trim() === '') return;
        const newTask = addTask(listId, nombre, descripcion, fechaLimite);
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

    const handleUpdateTask = (listId: number, taskId: number, updates: Partial<Task>) => {
        const updatedTask = updateTask(listId, taskId, updates);
        if (updatedTask) {
            setLists(lists.map(list => 
                list.id === listId 
                    ? { ...list, tareas: list.tareas.map(task => task.id === taskId ? updatedTask : task) }
                    : list
            ));
        }
    };

    const handleDeleteTask = (listId: number, taskId: number) => {
        if (deleteTask(listId, taskId)) {
            setLists(lists.map(list => 
                list.id === listId 
                    ? { ...list, tareas: list.tareas.filter(task => task.id !== taskId) }
                    : list
            ));
        }
    };

    const handleToggleTaskStatus = (listId: number, taskId: number) => {
        const updatedTask = toggleTaskStatus(listId, taskId);
        if (updatedTask) {
            setLists(lists.map(list => 
                list.id === listId 
                    ? { ...list, tareas: list.tareas.map(task => task.id === taskId ? updatedTask : task) }
                    : list
            ));
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