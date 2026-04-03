// user router 
import express from 'express';
import { deleteUser, findAllUsers, findUserByEmail, findUserById, getMe, hardDeleteUser, updateUser, updateUserById } from '../../controllers/user.controller';
import { validateRequestBody } from '../../validators';
import { updateUserSchemaValidator } from '../../validators/user.validators';
import { authorize } from '../../middlewares/rbac.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
const userRouter = express.Router();


userRouter.put('/:id', validateRequestBody(updateUserSchemaValidator), authenticate, authorize("admin"), updateUserById),

// analysts,admins,viewers can update their own profile without needing admin role
userRouter.put('/', validateRequestBody(updateUserSchemaValidator), authenticate, authorize("admin","viewer","analyst"), updateUser),

// anyone can access their own profile
userRouter.get('/me', authenticate, authorize("admin","viewer","analyst"), getMe),

userRouter.get('/:id', authenticate, authorize("admin"), findUserById),
userRouter.delete('/:id', authenticate, authorize("admin"), deleteUser),
userRouter.get('/:id', authenticate, authorize("admin"), findUserById),
userRouter.get('/email/:email', authenticate, authorize("admin"), findUserByEmail),
userRouter.get('/', authenticate, authorize("admin"), findAllUsers),
userRouter.delete('/hard/:id', authenticate, authorize("admin"), hardDeleteUser);
export default userRouter;      