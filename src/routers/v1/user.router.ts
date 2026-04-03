// user router 
import express from 'express';
import { deleteUser, findAllUsers, findUserByEmail, findUserById, hardDeleteUser, loginUser, registerUser, updateUser } from '../../controllers/user.controller';
import { validateRequestBody } from '../../validators';
import { loginSchemaValidator, registerSchemaValidator, updateUserSchemaValidator } from '../../validators/user.validators';
const userRouter = express.Router();

userRouter.post('/register',validateRequestBody(registerSchemaValidator),registerUser),
userRouter.post('/login', validateRequestBody(loginSchemaValidator), loginUser),
userRouter.put('/:id', validateRequestBody(updateUserSchemaValidator), updateUser),
userRouter.delete('/:id', deleteUser),
userRouter.get('/:id', findUserById),
userRouter.get('/email/:email', findUserByEmail),
userRouter.get('/', findAllUsers),
userRouter.delete('/hard/:id', hardDeleteUser)
export default userRouter;      