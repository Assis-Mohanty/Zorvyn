// user router 
import express from 'express';
import { loginUser, registerUser, updateUser } from '../../controllers/user.controller';
const userRouter = express.Router();

userRouter.post('/register', registerUser),
userRouter.post('/login', loginUser),
userRouter.put('/:id', updateUser),
userRouter.delete('/:id', deleteUser),
userRouter.get('/:id', findById),
userRouter.get('/email/:email', findByEmail),
userRouter.get('/', findAll),
userRouter.delete('/hard/:id', hardDelete)
export default userRouter;      