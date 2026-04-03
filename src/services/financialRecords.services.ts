import { CreateFinancialRecordDTO, IFinancialRecord, UpdateFinancialRecordDTO } from "../dto/financeRecords.dto";
import { FinancialRecord } from "../models/finance.model";
import { IFinancialRecordRepository } from "../repositories/financeRecords.repository";

export interface IFinancialRecordService {
    create(record: CreateFinancialRecordDTO): Promise<void>;
    findById(id: number): Promise<IFinancialRecord | null>;
    findAll(): Promise<IFinancialRecord[]>;
    update(id: number, record: UpdateFinancialRecordDTO): Promise<void>;
    delete(id: number): Promise<void>;
    summary(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ total: number, category: string }[]>;
    monthlyTrend(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ month: string, total: number }[]>;
    findFinancialRecordsByUserId(userId:number):Promise<IFinancialRecord[]>;
}
export class FinancialRecordService implements IFinancialRecordService {
    private financialRecordRepository: IFinancialRecordRepository;
    constructor(financialRecordRepository: IFinancialRecordRepository) {
        this.financialRecordRepository = financialRecordRepository;
    }
    async create(record: CreateFinancialRecordDTO): Promise<void> {
        await this.financialRecordRepository.create(record);
        return;
    }
    async findById(id: number): Promise<IFinancialRecord | null> {
        return await this.financialRecordRepository.findById(id);
    }
    async findAll(): Promise<IFinancialRecord[]> {
        return await this.financialRecordRepository.findAll();
    }
    async update(id: number, record: UpdateFinancialRecordDTO): Promise<void> {
        await this.financialRecordRepository.update(id, record);
        return;
    }
    async delete(id: number): Promise<void> {
        await this.financialRecordRepository.delete(id);
        return;
    }
    async summary(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ total: number, category: string }[]> {
        return await this.financialRecordRepository.summary(filters);
    }
    async monthlyTrend(filters: { userId?: number, type?: "income" | "expense", category?: string, date?: Date }): Promise<{ month: string, total: number }[]> {
        return await this.financialRecordRepository.monthlyTrend(filters);
    }
    async findFinancialRecordsByUserId(userId:number){
        return await FinancialRecord.findAll({where:{userId}});
    }
}   