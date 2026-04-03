export type IFinancialRecord = {
    id: number;
    userId: number;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: Date;
    notes?: string | null;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export type CreateFinancialRecordDTO = {
    userId: number;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: Date;
    notes?: string | null;
}
export type UpdateFinancialRecordDTO = {
    amount?: number;
    type?: "income" | "expense";
    category?: string;
    date?: Date;
    notes?: string | null;
}