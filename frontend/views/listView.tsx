// views/ListView.tsx
import React, { useState } from 'react';
import { List, Task } from '../models/taskModel';
import { logout } from '@/controller/loginController';
import router from 'next/router';

const handleLogout = () => {
    logout();
    router.push('/');
};

interface ListViewProps {
    lists: List[];
    onAddList: (nombre: string) => void;
    onUpdateList: (id: number, nombre: string) => void;
    onDeleteList: (id: number) => void;
    onAddTask: (listId: number, nombre: string, descripcion: string, fechaLimite: string) => void;
    onUpdateTask: (listId: number, taskId: number, updates: Partial<Task>) => void;
    onDeleteTask: (listId: number, taskId: number) => void;
    onToggleTaskStatus: (listId: number, taskId: number) => void;
}

const ListView: React.FC<ListViewProps> = ({
    lists,
    onAddList,
    onUpdateList,
    onDeleteList,
    onAddTask,
    onUpdateTask,
    onDeleteTask,
    onToggleTaskStatus
}) => {
    const [newListName, setNewListName] = useState('');
    const [selectedListId, setSelectedListId] = useState<number | null>(null);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [newTaskDate, setNewTaskDate] = useState('');

    const selectedList = lists.find(list => list.id === selectedListId);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Lista de listas */}
            <div className="relative w-1/3 p-4 bg-white shadow-lg ">
                <div
                    className='absolute right-4 mr-auto w-2/5 bg-red-700 text-white p-2 rounded hover:bg-red-600 cursor-pointer'
                    onClick={handleLogout}
                >
                    <div className="text-center">
                        Salir
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Listas</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="Nueva lista"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={() => {
                            onAddList(newListName);
                            setNewListName('');
                        }}
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Añadir Lista
                    </button>
                </div>

                <div className='relative overflow-auto h-2/4 rounded-[8px]'>
                    <ul>
                        {lists.map(list => (
                            <li
                                key={list.id}
                                className={`p-2 mb-2 rounded cursor-pointer ${selectedListId === list.id ? 'bg-blue-200' : 'hover:bg-gray-300'}`}
                                onClick={() => setSelectedListId(list.id)}
                            >
                                {list.nombre}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newName = prompt('Nuevo nombre de la lista', list.nombre);
                                        if (newName) onUpdateList(list.id, newName);
                                    }}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('¿Estás seguro de que quieres eliminar esta lista?')) {
                                            onDeleteList(list.id);
                                            if (selectedListId === list.id) setSelectedListId(null);
                                        }
                                    }}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>


                </div>

            </div>

            {/* Tareas de la lista seleccionada */}
            <div className="w-2/3 p-4">

                {selectedList ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Tareas de {selectedList.nombre}</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                placeholder="Nombre de la tarea"
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                value={newTaskDesc}
                                onChange={(e) => setNewTaskDesc(e.target.value)}
                                placeholder="Descripción de la tarea"
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="date"
                                value={newTaskDate}
                                onChange={(e) => setNewTaskDate(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <button
                                onClick={() => {
                                    onAddTask(selectedList.id, newTaskName, newTaskDesc, newTaskDate);
                                    setNewTaskName('');
                                    setNewTaskDesc('');
                                    setNewTaskDate('');
                                }}
                                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                                Añadir Tarea
                            </button>
                        </div>
                        <div className='relative overflow-auto h-2/4 rounded-[8px]'>
                            <ul>
                                {selectedList.tareas.map(task => (
                                    <li key={task.id} className="p-2 mb-2 bg-white shadow rounded">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={task.realizado}
                                                onChange={() => onToggleTaskStatus(selectedList.id, task.id)}
                                                className="mr-2"
                                            />
                                            <span className={task.realizado ? 'line-through' : ''}>
                                                {task.nombre} - {task.descripcion} - {task.fechaLimite}
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <button
                                                onClick={() => {
                                                    const newName = prompt('Nuevo nombre de la tarea', task.nombre);
                                                    const newDesc = prompt('Nueva descripción de la tarea', task.descripcion);
                                                    const newDate = prompt('Nueva fecha límite', task.fechaLimite);
                                                    if (newName && newDesc && newDate) {
                                                        onUpdateTask(selectedList.id, task.id, { nombre: newName, descripcion: newDesc, fechaLimite: newDate });
                                                    }
                                                }}
                                                className="mr-2 text-blue-500 hover:text-blue-700"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                                                        onDeleteTask(selectedList.id, task.id);
                                                    }
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <p className="text-xl text-gray-500">Selecciona una lista para ver sus tareas</p>
                )}
            </div>
        </div>
    );
};

export default ListView;