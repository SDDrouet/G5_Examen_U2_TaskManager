// models/taskModel.ts
export interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    fechaLimite: string;
    realizado: boolean;
}

export interface List {
    id: number;
    nombre: string;
    tareas: Task[];
}