import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";

export type RecordType = "income" | "expense";

export interface FinancialRecordAttributes {
  id: number;
  userId: number;
  amount: number;
  type: RecordType;
  category: string;
  date: Date;
  notes?: string | null;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FinancialRecordCreationAttributes extends Optional<
  FinancialRecordAttributes,
  "id" | "notes" | "deletedAt"
> {}

export class FinancialRecord
  extends Model<FinancialRecordAttributes, FinancialRecordCreationAttributes>
  implements FinancialRecordAttributes
{
  public id!: number;
  public userId!: number;
  public amount!: number;
  public type!: RecordType;
  public category!: string;
  public date!: Date;
  public notes!: string | null;
  public deletedAt!: Date | null;
}

FinancialRecord.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    amount: { 
        type: DataTypes.DECIMAL(12, 2), 
        allowNull: false },
    type: { 
        type: DataTypes.ENUM("income", "expense"), 
        allowNull: false },

    category: { 
        type: DataTypes.STRING, 
        allowNull: false },
    date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false },
    notes: { 
        type: DataTypes.TEXT, 
        allowNull: true },
    deletedAt: { 
        type: DataTypes.DATE, 
        allowNull: true, 
        defaultValue: null },
  },
  { 
    sequelize, 
    tableName: "financial_records", 
    timestamps: true 
},
);
