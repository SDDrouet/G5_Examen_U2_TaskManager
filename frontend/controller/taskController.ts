// controllers/taskController.ts
import { Task, Group, getTasks, getGroups, addTask, addGroup, updateTask, deleteTask } from '../models/taskModel';

export const fetchTasks = () => {
    return getTasks();
};

export const fetchGroups = () => {
    return getGroups();
};

export const createTask = (task: Task) => {
    addTask(task);
};

export const createGroup = (group: Group) => {
    addGroup(group);
};

export const modifyTask = (task: Task) => {
    updateTask(task);
};

export const removeTask = (taskId: number) => {
    deleteTask(taskId);
};
