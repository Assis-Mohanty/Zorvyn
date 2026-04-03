// this is the repository for the finance records
import { CreateFinancialRecordDTO, IFinancialRecord, UpdateFinancialRecordDTO } from "../dto/financeRecords.dto";
import { FinancialRecord } from "../models/finance.model";
import { NotFoundError } from "../utils/errors/app.error";
import { col, fn } from "sequelize";

export interface IFinancialRecordRepository{
    create(record: CreateFinancialRecordDTO): Promise<void>;
    findById(id: number): Promise<IFinancialRecord | null>;
    findAll(): Promise<IFinancialRecord[]>;
    update(id: number, record: UpdateFinancialRecordDTO): Promise<void>;
    delete(id: number): Promise<void>;
    filteredList(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<IFinancialRecord[]>;

    // DB-level SUM/GROUP BY summary, monthly trend 
    summary(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ total: number, category: string }[]>;
    monthlyTrend(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ month: string, total: number }[]>;
}

export class FinancialRecordRepository implements IFinancialRecordRepository{
    async create(record: CreateFinancialRecordDTO): Promise<void> {
        const newRecord = await FinancialRecord.create(record);
        await newRecord.save();
        return;
    }
    async findById(id: number): Promise<IFinancialRecord | null> {
        const record = await FinancialRecord.findByPk(id);
        return record ? (record.toJSON() as IFinancialRecord) : null;
    }
    async findAll(): Promise<IFinancialRecord[]> {
        const records = await FinancialRecord.findAll();
        return records.map(record => record.toJSON());
    }
    async update(id: number, record: UpdateFinancialRecordDTO): Promise<void> {
        const existingRecord = await FinancialRecord.findByPk(id);
        if (!existingRecord) {
            throw new NotFoundError("Financial record not found");
        }
        const updatedRecord = await existingRecord.update(record);
        await updatedRecord.save();
        return;
    }
    async delete(id: number): Promise<void> {
        const existingRecord = await FinancialRecord.findByPk(id);
        if (!existingRecord) {
            throw new NotFoundError("Financial record not found");
        }
        await existingRecord.destroy();
        return;
    }
    async filteredList(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<IFinancialRecord[]> {
        const records = await FinancialRecord.findAll({ where: filters });
        return records.map(record => record.toJSON());
    }
    async summary(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ total: number, category: string }[]> {
        const rows = await FinancialRecord.findAll({ where: filters, 
            attributes: ['type', [fn('SUM', col('amount')), 'total']], 
            group: ['type']}) as any[];
            let totalIncome = 0;
            let totalExpense = 0;
            for (const r of rows) {
                if (r.type === 'income')  { 
                    totalIncome += parseFloat(r.total);
                } else {
                    totalExpense += parseFloat(r.total);
                }
            }
            return [{ total: totalIncome, category: 'income' }, { total: totalExpense, category: 'expense' }];
        }
        async monthlyTrend(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ month: string, total: number }[]> {
            const rows = await FinancialRecord.findAll({ where: filters,
                attributes: ['date', [fn('SUM', col('amount')), 'total']],
                group: ['date']}) as any[];
                const monthlyTrend = rows.map(r => ({ month: r.date.toISOString().split('T')[0], total: parseFloat(r.total) }));
                return monthlyTrend;
    }
}