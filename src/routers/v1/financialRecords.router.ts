import express from "express";
const financialRecordRouter = express.Router();

import { createFinancialRecord, findAllFinancialRecords, findAllFinancialRecordsByUserId, findFinancialRecordById, monthlyTrend, summary, updateFinancialRecord } from "../../controllers/financialRecord.controller";
import { createRecordSchemaValidator, updateRecordSchemaValidator } from "../../validators/financialRecords.validator";
import { validateRequestBody } from "../../validators";

financialRecordRouter.post('/', validateRequestBody(createRecordSchemaValidator), createFinancialRecord);
financialRecordRouter.get('/:id', findFinancialRecordById);
financialRecordRouter.get('/', findAllFinancialRecords);
financialRecordRouter.get('/user/:userId', findAllFinancialRecordsByUserId);
financialRecordRouter.put('/:id', validateRequestBody(updateRecordSchemaValidator), updateFinancialRecord);
financialRecordRouter.get('/user/:userId', findAllFinancialRecordsByUserId);
financialRecordRouter.get('/summary', summary);
financialRecordRouter.get('/trend', monthlyTrend);

export default financialRecordRouter;