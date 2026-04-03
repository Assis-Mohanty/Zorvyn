import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";

export type UserRole = "admin" | "analyst" | "viewer";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "isActive" | "deletedAt"
> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public isActive!: boolean;
  public deletedAt!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "analyst", "viewer"),
      allowNull: false,
      defaultValue: "viewer",
    },
    isActive: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
  },
  {
    sequelize,
    tableName: "users",
    paranoid: true,
    timestamps: true,
  },
);
