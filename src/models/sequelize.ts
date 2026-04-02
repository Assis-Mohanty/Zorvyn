import { Sequelize } from "sequelize";
import { dbConfig } from "../config";

const sequelize=new Sequelize({
    dialect:'mysql',
    host:dbConfig.DB_HOST,
    database:dbConfig.DB_NAME,
    username:dbConfig.DB_USER,
    password:dbConfig.DB_PASSWORD 
})

export default sequelize