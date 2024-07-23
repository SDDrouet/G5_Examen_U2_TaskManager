// views/taskView.tsx
import React, { useState } from 'react';
import { Task, Group } from '../models/taskModel';
import { fetchTasks, fetchGroups, createTask, createGroup, modifyTask, removeTask } from '../controller/taskController';

const TaskView: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [groups, setGroups] = useState<Group[]>(fetchGroups());
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [newTask, setNewTask] = useState<Task>({
        id: 0,
        nombre: '',
        descripcion: '',
        fechaLimite: ''
    });
    const [newGroup, setNewGroup] = useState<Group>({
        id: 0,
        nombre: '',
        tareas: []
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ type: 'task' | 'group'; id: number } | null>(null);

    const handleCreateTask = () => {
        if (selectedGroup) {
            const task = { ...newTask, id: tasks.length + 1 };
            createTask(task);
            setTasks(fetchTasks());
            setNewTask({ id: 0, nombre: '', descripcion: '', fechaLimite: '' });
        }
    };

    const handleCreateGroup = () => {
        const group = { ...newGroup, id: groups.length + 1 };
        createGroup(group);
        setGroups(fetchGroups());
        setNewGroup({ id: 0, nombre: '', tareas: [] });
    };

    const handleUpdateTask = (task: Task) => {
        modifyTask(task);
        setTasks(fetchTasks());
    };

    const handleDelete = () => {
        if (itemToDelete) {
            if (itemToDelete.type === 'task') {
                removeTask(itemToDelete.id);
                setTasks(fetchTasks());
            } else if (itemToDelete.type === 'group') {
                // Delete group logic here
            }
            setShowDeleteConfirm(false);
        }
    };

    const confirmDelete = (type: 'task' | 'group', id: number) => {
        setItemToDelete({ type, id });
        setShowDeleteConfirm(true);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Grupos</h2>
                <ul className="mb-4">
                    {groups.map(group => (
                        <li key={group.id} className="mb-2 cursor-pointer" onClick={() => setSelectedGroup(group)}>
                            {group.nombre}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Nombre del Grupo"
                    value={newGroup.nombre}
                    onChange={(e) => setNewGroup({ ...newGroup, nombre: e.target.value })}
                    className="w-full p-2 mb-2 text-black"
                />
                <button onClick={handleCreateGroup} className="w-full bg-blue-500 text-white p-2 rounded">Crear Grupo</button>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                {selectedGroup ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">{selectedGroup.nombre}</h2>
                        <ul className="mb-4">
                            {selectedGroup.tareas.map(task => (
                                <li key={task.id} className="border p-4 mb-2 rounded flex justify-between items-center">
                                    <div>
                                        <div><strong>Nombre:</strong> {task.nombre}</div>
                                        <div><strong>Descripción:</strong> {task.descripcion}</div>
                                        <div><strong>Fecha Límite:</strong> {task.fechaLimite}</div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => confirmDelete('task', task.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* Create Task */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Crear Tarea</h3>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={newTask.nombre}
                                onChange={(e) => setNewTask({ ...newTask, nombre: e.target.value })}
                                className="border p-2 mb-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Descripción"
                                value={newTask.descripcion}
                                onChange={(e) => setNewTask({ ...newTask, descripcion: e.target.value })}
                                className="border p-2 mb-2 w-full"
                            />
                            <input
                                type="date"
                                value={newTask.fechaLimite}
                                onChange={(e) => setNewTask({ ...newTask, fechaLimite: e.target.value })}
                                className="border p-2 mb-2 w-full"
                            />
                            <button onClick={handleCreateTask} className="bg-blue-500 text-white px-4 py-2 rounded">Crear Tarea</button>
                        </div>
                    </>
                ) : (
                    <p className="text-xl">Selecciona un grupo para ver sus tareas</p>
                )}
            </div>

            {/* Delete Confirmation Popup */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded">
                        <p>¿Estás seguro que quieres eliminar este {itemToDelete?.type === 'task' ? 'tarea' : 'grupo'}?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">Cancelar</button>
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskView;
