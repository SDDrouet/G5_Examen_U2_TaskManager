// routes/userRoutes.ts
import express from 'express';
import * as userService from '../services/userService'; // Importa desde userService
import { Task, List } from '../models/TaskModel';

var jwt = require('jsonwebtoken');


const router = express.Router();

router.get('/', async (req, res) => {
    const users = await userService.readUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await userService.getUserById(parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUserSuccess = await userService.createUser(req.body);        
        if (newUserSuccess) {
            res.status(201).json({ message: 'Registro OK' });
        } else {
            res.status(402).json({ message: 'El Usuario ya existe' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const updatedUser = await userService.updateUser(parseInt(req.params.id), req.body);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

router.delete('/:id', async (req, res) => {
    const deleted = await userService.deleteUser(parseInt(req.params.id));
    if (deleted) {
        res.json({ message: 'Usuario eliminado' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.loginUser(email, password);
        if (user) {
            // Genera un token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || 'Prueba@123',
                { expiresIn: '1h' } // El token expira en 1 hora
            );
            
            // Devuelve el usuario y el token
            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token
            });
        } else {
            res.status(401).json({ message: 'Email or password is incorrect' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});
// routes/userRoutes.ts

// Obtener todas las tareas de un usuario
router.get('/:id/tasks', async (req, res) => {
    const tasks = await userService.getTasks(parseInt(req.params.id));
    res.json(tasks);
});

// Agregar una nueva tarea a un usuario
router.post('/:id/:idList/tasks', async (req, res) => {
    try {
        const newTask: Task = req.body;
        const user = await userService.addTaskToList(parseInt(req.params.id), parseInt(req.params.idList), newTask);
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una tarea de un usuario
router.put('/:id/tasks/:taskId', async (req, res) => {
    try {
        const updatedTask: Partial<Task> = req.body;
        const user = await userService.updateTask(parseInt(req.params.id), parseInt(req.params.taskId), updatedTask);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario o tarea no encontrado' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una tarea de un usuario
router.delete('/:id/tasks/:taskId', async (req, res) => {
    const user = await userService.deleteTask(parseInt(req.params.id), parseInt(req.params.taskId));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario o tarea no encontrado' });
    }
});

router.get('/:userId/lists', async (req, res) => {
    try {
        const lists = await userService.getLists(parseInt(req.params.userId));
        res.json(lists);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:userId/lists/:listId', async (req, res) => {
    try {
        const list = await userService.getListById(parseInt(req.params.userId), parseInt(req.params.listId));
        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ message: 'Lista no encontrada' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:userId/lists', async (req, res) => {
    try {
        const newList: List = req.body;
        const updatedUser = await userService.addList(parseInt(req.params.userId), newList);
        if (updatedUser) {
            res.status(201).json(updatedUser.lists[updatedUser.lists.length - 1]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:userId/lists/:listId', async (req, res) => {
    try {
        const updatedList: Partial<List> = req.body;
        const updatedUser = await userService.updateList(parseInt(req.params.userId), parseInt(req.params.listId), updatedList);
        if (updatedUser) {
            const updatedListInUser = updatedUser.lists.find(list => list.id === parseInt(req.params.listId));
            res.json(updatedListInUser);
        } else {
            res.status(404).json({ message: 'Usuario o lista no encontrada' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:userId/lists/:listId', async (req, res) => {
    try {
        const updatedUser = await userService.deleteList(parseInt(req.params.userId), parseInt(req.params.listId));
        if (updatedUser) {
            res.json({ message: 'Lista eliminada' });
        } else {
            res.status(404).json({ message: 'Usuario o lista no encontrada' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Rutas para tareas dentro de listas
router.get('/:userId/tasks', async (req, res) => {
    try {
        const tasks = await userService.getTasks(parseInt(req.params.userId));
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:userId/tasks', async (req, res) => {
    try {
        const newTask: Task = req.body;
        const updatedUser = await userService.addTask(parseInt(req.params.userId), newTask);
        if (updatedUser) {
            const addedTask = updatedUser.lists[0].tareas[updatedUser.lists[0].tareas.length - 1];
            res.status(201).json(addedTask);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:userId/tasks/:taskId', async (req, res) => {
    try {
        const updatedTask: Partial<Task> = req.body;
        const updatedUser = await userService.updateTask(parseInt(req.params.userId), parseInt(req.params.taskId), updatedTask);
        if (updatedUser) {
            const updatedTaskInUser = updatedUser.lists.flatMap(list => list.tareas).find(task => task.id === parseInt(req.params.taskId));
            res.json(updatedTaskInUser);
        } else {
            res.status(404).json({ message: 'Usuario o tarea no encontrada' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:userId/tasks/:taskId', async (req, res) => {
    try {
        const updatedUser = await userService.deleteTask(parseInt(req.params.userId), parseInt(req.params.taskId));
        if (updatedUser) {
            res.json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Usuario o tarea no encontrada' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;