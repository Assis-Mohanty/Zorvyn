import express from "express";
const financialRecordRouter = express.Router();

import { createFinancialRecord, findAllFinancialRecords, findAllFinancialRecordsByUserId, findFinancialRecordById, updateFinancialRecord } from "../../controllers/financialRecord.controller";
import { createRecordSchemaValidator, updateRecordSchemaValidator } from "../../validators/financialRecords.validator";
import { validateRequestBody } from "../../validators";
import { authenticate } from './../../middlewares/auth.middleware';
import { authorize } from './../../middlewares/rbac.middleware';

financialRecordRouter.post('/', validateRequestBody(createRecordSchemaValidator), authenticate, authorize("analyst"), createFinancialRecord);
financialRecordRouter.get('/:id', authenticate, authorize("analyst"), findFinancialRecordById);
financialRecordRouter.get('/', authenticate, authorize("analyst"), findAllFinancialRecords);
financialRecordRouter.get('/user/:userId', authenticate, authorize("analyst"), findAllFinancialRecordsByUserId);
financialRecordRouter.put('/:id', validateRequestBody(updateRecordSchemaValidator), authenticate, authorize("analyst"), updateFinancialRecord);
financialRecordRouter.get('/user/:userId', authenticate, authorize("analyst"), findAllFinancialRecordsByUserId);


export default financialRecordRouter;