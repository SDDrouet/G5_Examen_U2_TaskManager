// controllers/registerController.ts
import User from '../models/user';

const users: User[] = [];

export const register = (name: string, email: string, password: string): User => {
    const newUser: User = {
        id: users.length + 1,
        name,
        email,
        password,
    };
    users.push(newUser);
    console.log(users);
    return newUser;
};
