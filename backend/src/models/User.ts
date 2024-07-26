// models/User.ts
import { List } from './TaskModel';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    lists: List[]; // Asegúrate de que esta línea esté presente
}

export default User;