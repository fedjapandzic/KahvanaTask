import express from 'express';
import * as usersController from '../controllers/usersController';


const app = express();

app.get('/', usersController.getAllUsers);
app.get('/:id', usersController.getUserById);
app.post('/', usersController.createUser);
app.put('/:id', usersController.updateUser);
app.delete('/:id', usersController.deleteUser);

export default app;
