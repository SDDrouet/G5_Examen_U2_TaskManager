// models/taskModel.ts
export interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    fechaLimite: string;
    realizado: boolean; // Asegúrate de que esta línea esté presente
}


export interface List {
    id: number;
    nombre: string;
    tareas: Task[];
}

