// views/ListView.tsx
import React, { useState, useEffect } from 'react';
import { List, Task } from '../models/taskModel';
import { logout } from '@/controller/loginController';
import router from 'next/router';
import ListItem from './components/ListItem';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import Image from 'next/image';


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
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    const selectedList = lists.find(list => list.id === selectedListId);
    const pendingTasks = selectedList ? selectedList.tareas.filter(task => !task.realizado) : [];
    const completedTasks = selectedList ? selectedList.tareas.filter(task => task.realizado) : [];

    useEffect(() => {
        // Obtener el nombre de usuario desde localStorage
        const storedUserName = JSON.parse(localStorage.getItem('user') || '{}').name;
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Lista de listas */}
            <div className="relative w-1/3 p-4 bg-white shadow-lg ">
                <div
                    className='absolute right-4 mr-auto w-2/5 p-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 cursor-pointer'
                    onClick={handleLogout}
                >
                    <div className="text-center font-bold">
                        Salir
                    </div>
                </div>

                <p className="text-xl font-bold mb-4 mt-1">Hola, {userName}</p>

                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="Nueva lista"
                        className="w-4/5 p-2 border rounded-l"
                    />
                    <button
                        onClick={() => {
                            onAddList(newListName);
                            setNewListName('');
                        }}
                        className="w-1/5 p-2 text-white bg-blue-500 rounded-r shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-bold"
                    >
                        +
                    </button>
                </div>

                <div className='relative overflow-auto h-3/4 rounded-[8px]'>
                    <ul>
                        {lists.map(list => (
                            <li key={list.id}>
                                <ListItem
                                    name={list.nombre}
                                    onEdit={() => {
                                        const newName = prompt('Nuevo nombre de la lista', list.nombre);
                                        if (newName) onUpdateList(list.id, newName);
                                    }}
                                    onDelete={() => {
                                        if (confirm('¿Estás seguro de que quieres eliminar esta lista?')) {
                                            onDeleteList(list.id);
                                            if (selectedListId === list.id) setSelectedListId(null);
                                        }
                                    }}
                                    onClick={() => setSelectedListId(list.id)}
                                    isSelected={selectedListId === list.id}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="absolute bottom-2 left-2">
                <Image
                    src="/Logo2.png" // Ruta del logo en la carpeta public
                    alt="Logo"
                    width={100} // Ajusta el tamaño del logo según tus necesidades
                    height={100}
                />
            </div>

            </div>

            {/* Tareas de la lista seleccionada */}
            <div className="relative w-2/3 p-4">
            
                {selectedList ? (
                    <>
                        
                       <TaskForm selectedList={selectedList} onAddTask={onAddTask} />
                        <div className='relative overflow-auto h-5/6 rounded-[8px]'>
                            <h3 className="text-xl font-semibold mb-2">Tareas Pendientes</h3>
                            <ul>
                                {pendingTasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onUpdate={(taskId) => {
                                            const newName = prompt('Nuevo nombre de la tarea', task.nombre);
                                            const newDesc = prompt('Nueva descripción de la tarea', task.descripcion);
                                            const newDate = prompt('Nueva fecha límite', task.fechaLimite);
                                            if (newName && newDesc && newDate) {
                                                onUpdateTask(selectedList.id, taskId, { nombre: newName, descripcion: newDesc, fechaLimite: newDate });
                                            }
                                        }}
                                        onDelete={(taskId) => {
                                            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                                                onDeleteTask(selectedList.id, taskId);
                                            }
                                        }}
                                        onToggleStatus={(taskId) => onToggleTaskStatus(selectedList.id, taskId)}
                                    />
                                ))}
                            </ul>
                            <h3 className="text-xl font-semibold mt-4 mb-2">Tareas Completadas</h3>
                            <ul>
                                {completedTasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onUpdate={(taskId) => {
                                            const newName = prompt('Nuevo nombre de la tarea', task.nombre);
                                            const newDesc = prompt('Nueva descripción de la tarea', task.descripcion);
                                            const newDate = prompt('Nueva fecha límite', task.fechaLimite);
                                            if (newName && newDesc && newDate) {
                                                onUpdateTask(selectedList.id, taskId, { nombre: newName, descripcion: newDesc, fechaLimite: newDate });
                                            }
                                        }}
                                        onDelete={(taskId) => {
                                            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                                                onDeleteTask(selectedList.id, taskId);
                                            }
                                        }}
                                        onToggleStatus={(taskId) => onToggleTaskStatus(selectedList.id, taskId)}
                                    />
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
