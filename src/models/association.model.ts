import { FinancialRecord } from "./finance.model";
import { User } from "./user.model";



User.hasMany(FinancialRecord, { foreignKey: 'userId', as: 'records' });
FinancialRecord.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 
