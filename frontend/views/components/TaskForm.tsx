import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { List } from '../../models/taskModel';

interface FormProps {
    selectedList: List;
    onAddTask: (listId: number, nombre: string, descripcion: string, fechaLimite: string) => void;
}

const TaskForm: React.FC<FormProps> = ({ selectedList, onAddTask }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [newTaskDate, setNewTaskDate] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onAddTask(selectedList.id, newTaskName, newTaskDesc, newTaskDate);
        setNewTaskName('');
        setNewTaskDesc('');
        setNewTaskDate('');
        setIsFormVisible(false);
    };

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Tareas de {selectedList.nombre}</h2>
                <button
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {isFormVisible ? 'Cerrar' : 'Nueva Tarea'}
                </button>
                
            </div>

            <Transition
                show={isFormVisible}
                enter="transition-all duration-300 ease-out"
                enterFrom="transform translate-y-full opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition-all duration-300 ease-in"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform translate-y-full opacity-50"
            >

                <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
                    <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Nombre de la tarea"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        value={newTaskDesc}
                        onChange={(e) => setNewTaskDesc(e.target.value)}
                        placeholder="Descripción de la tarea"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="date"
                        value={newTaskDate}
                        onChange={(e) => setNewTaskDate(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="flex-1 p-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Añadir
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsFormVisible(false)}
                            className="flex-1 text-gray-700 p-2 bg-gray-300 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Transition>
        </div>
    );
};

export default TaskForm;