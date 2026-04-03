import { NextFunction, Request, Response } from "express";
import { FinancialRecordService } from "../services/financialRecords.services";
import { CreateFinancialRecordDTO, UpdateFinancialRecordDTO } from "../dto/financeRecords.dto";
import { BadRequestError } from "../utils/errors/app.error";
import { FinancialRecordRepository } from "../repositories/financeRecords.repository";
import { getUserIdByJwt } from "../utils/helpers/getUserIdByJwt.helper";
import dayjs from 'dayjs'

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
        const token = req.headers.authorization?.split(" ")[1];
        const userId = await getUserIdByJwt(token as string, process.env.JWT_SECRET as string);

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

export async function summary(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, type, category, date } = req.query;
        const filters = {
            userId: userId ? Number(userId) : undefined,
            type: type as "income" | "expense" | undefined,
            category: category as string | undefined,
            date: date ? new Date(date as string) : undefined,
        };
        const summary = await financialRecordService.summary(filters);
        res.status(200).json({ summary, success: true });

    } catch (error) {
        next(error);
    }
}

export async function monthlyTrend(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const userId = await getUserIdByJwt(
            token as string,
            process.env.JWT_SECRET as string
        );
        const filters = req.query as {
            type?: "income" | "expense";
            category?: string;
            date?: Date;
        };
        const trend = await financialRecordService.monthlyTrend({
            ...filters,
            userId: Number(userId),
        });
        res.status(200).json({ trend, success: true });
    } catch (error) {
        next(error);
    }
}

export async function findFinancialRecordsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const userId = await getUserIdByJwt(token as string, process.env.JWT_SECRET as string);

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

const parseTrendFilters = (query: any, defaultDays: number) => {
  const endDate   = query.endDate   ?? dayjs().format('YYYY-MM-DD');
  const startDate = query.startDate ?? dayjs().subtract(defaultDays, 'day').format('YYYY-MM-DD');

  // Basic sanity check
  if (startDate > endDate) {
    throw new BadRequestError('startDate cannot be after endDate');
  }

  return { startDate, endDate };
};

export const getMonthlyTrend = async (req: any, res: Response, next: NextFunction) => {
  try {
    const filters = parseTrendFilters(req.query, 180); // default: last 6 months
    const data    = await financialRecordService.getMonthlyTrend(filters);
    res.json({ success: true, data, meta: filters });
  } catch (e) { next(e); }
};

export const getWeeklyTrend = async (req: any, res: Response, next: NextFunction) => {
  try {
    const filters = parseTrendFilters(req.query, 28); // default: last 4 weeks
    const data    = await financialRecordService.getWeeklyTrend(filters);
    res.json({ success: true, data, meta: filters });
  } catch (e) { next(e); }
};

export const getRecentActivity = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = await getUserIdByJwt(token as string, process.env.JWT_SECRET as string);
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const data = await financialRecordService.getRecentActivity(limit);
    res.json({ success: true, data, meta: { userId, limit } });
  } catch (e) { next(e); }
}
