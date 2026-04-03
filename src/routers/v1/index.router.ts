import express from 'express';
import userRouter from './user.router';
import financialRecordRouter from './financialRecords.router';

const v1Router = express.Router();


v1Router.use('/auth',userRouter);
v1Router.use('/records',financialRecordRouter);

export default v1Router;