// components/TaskItem.tsx
import React from 'react';
import { Task } from '../../models/taskModel';

interface TaskItemProps {
    task: Task;
    onUpdate: (taskId: number) => void;
    onDelete: (taskId: number) => void;
    onToggleStatus: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete, onToggleStatus }) => {
    return (
        <div className="flex items-center justify-between p-4 mb-2 bg-white shadow rounded">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.realizado}
                    onChange={() => onToggleStatus(task.id)}
                    className="mr-4 h-5 w-5 cursor-pointer appearance-none border-2 border-gray-300 hover:border-gray-800 rounded-full
                    checked:bg-gray-800 checked:hover:border-gray-600 checked:hover:bg-gray-400 checked:border-transparent focus:outline-none transition duration-200"
                />
                <div className="flex flex-col">
                    <span className={`font-bold ${task.realizado ? 'line-through' : ''}`}>{task.nombre}</span>
                    <span className={`text-sm text-gray-600 ${task.realizado ? 'line-through' : ''}`}>{task.descripcion}</span>
                    <span className={`text-sm text-gray-400 ${task.realizado ? 'line-through' : ''}`}>{task.fechaLimite}</span>
                </div>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={() => onUpdate(task.id)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <i className="fas fa-edit"></i>
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
