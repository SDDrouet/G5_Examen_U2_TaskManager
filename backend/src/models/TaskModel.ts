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
