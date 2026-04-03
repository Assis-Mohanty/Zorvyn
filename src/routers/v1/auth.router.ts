import express from 'express';
import { registerUser, loginUser } from '../../controllers/user.controller';
import { loginSchemaValidator, registerSchemaValidator } from '../../validators/user.validators';
const authRouter = express.Router();

import { validateRequestBody } from '../../validators';

authRouter.post('/register',validateRequestBody(registerSchemaValidator),registerUser)
authRouter.post('/login', validateRequestBody(loginSchemaValidator), loginUser)

export default authRouter;