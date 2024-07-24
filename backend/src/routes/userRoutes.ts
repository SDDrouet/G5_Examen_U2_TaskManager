import express from 'express';
import * as userService from '../services/userService';
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
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
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

export default router;