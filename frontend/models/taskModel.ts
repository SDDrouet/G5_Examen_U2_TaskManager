// models/taskModel.ts
export interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    fechaLimite: string;
}

export interface Group {
    id: number;
    nombre: string;
    tareas: Task[];
}

// Datos simulados
const tasks: Task[] = [
    { id: 1, nombre: 'Task 1', descripcion: 'Description for Task 1', fechaLimite: '2024-08-01' },
    { id: 2, nombre: 'Task 2', descripcion: 'Description for Task 2', fechaLimite: '2024-08-15' }
];

const groups: Group[] = [
    { id: 1, nombre: 'Group 1', tareas: tasks }
];

export const getTasks = () => {
    return tasks;
};

export const getGroups = () => {
    return groups;
};

export const addTask = (task: Task) => {
    tasks.push(task);
};

export const addGroup = (group: Group) => {
    groups.push(group);
};

export const updateTask = (updatedTask: Task) => {
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = updatedTask;
    }
};

export const deleteTask = (taskId: number) => {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
};
