import { NextFunction, Request, Response } from "express";
import { FinancialRecordService } from "../services/financialRecords.services";
import { CreateFinancialRecordDTO, UpdateFinancialRecordDTO } from "../dto/financeRecords.dto";
import { BadRequestError } from "../utils/errors/app.error";
import { FinancialRecordRepository } from "../repositories/financeRecords.repository";

const financialRecordRepository = new FinancialRecordRepository();
const financialRecordService = new FinancialRecordService(financialRecordRepository);

export async function createFinancialRecord(req: Request, res: Response, next: NextFunction) {
    try {
        const record: CreateFinancialRecordDTO = req.body;

        if (!record.userId) {
            throw new BadRequestError("User ID is required");
        }

        await financialRecordService.create(record);

        res.status(201).json({
            message: "financial record created successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}


export async function findFinancialRecordById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const record = await financialRecordService.findById(Number(id));

        res.status(200).json({
            record,
            success: true
        });
    } catch (error) {
        next(error);
    }
}


export async function findAllFinancialRecords(req: Request, res: Response, next: NextFunction) {
    try {
        const records = await financialRecordService.findAll();

        res.status(200).json({
            records,
            success: true
        });
    } catch (error) {
        next(error);
    }
}


export async function findAllFinancialRecordsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;

        if (!userId) {
            throw new BadRequestError("User ID is required");
        }

        const records = await financialRecordService.findFinancialRecordsByUserId(Number(userId));

        res.status(200).json({
            records,
            success: true
        });
    } catch (error) {
        next(error);
    }
}


export async function updateFinancialRecord(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const record: UpdateFinancialRecordDTO = req.body;

        await financialRecordService.update(Number(id), record);

        res.status(200).json({
            message: "financial record updated successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}