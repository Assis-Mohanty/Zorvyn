import express from 'express';
import userRouter from './user.router';
import financialRecordRouter from './financialRecords.router';
import authRouter from './auth.router';

const v1Router = express.Router();


v1Router.use('/user',userRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/records',financialRecordRouter);
v1Router.use('/dashboard', financialRecordRouter); 

export default v1Router;