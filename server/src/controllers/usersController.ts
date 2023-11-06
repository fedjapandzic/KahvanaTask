import { Request, Response } from 'express';
import * as userQueries from '../functions/userDataFunctions';
import { User } from '../interfaces/User';

export function getAllUsers(req: Request, res: Response) {
    const { query, email, phoneNumber } = req.query;
    const users = userQueries.getAllUsers(
        query as string,
        email as string,
        phoneNumber as string
    );
    res.json(users);
}

export function getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const user = userQueries.findUserById(userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}

export function createUser(req: Request, res: Response) {
    const newUser = req.body as User;
    const createdUser = userQueries.createUser(newUser);
    res.status(201).json(createdUser);
}

export function updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const updatedUser = req.body as User;
    const user = userQueries.updateUser(userId, updatedUser);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}

export function deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    const success = userQueries.deleteUser(userId);

    if (success) {
        res.json(true);
    } else {
        res.status(404).json(false);
    }
}