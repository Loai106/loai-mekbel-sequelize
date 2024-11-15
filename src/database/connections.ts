import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect:"mysql",
    username: process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    models: [__dirname+"/models"]
})

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((error) => console.error('Unable to connect to the database:', error));

/*
sequelize.sync({ force: true , logging:false }) 
    .then(() => console.log("Database & tables synced"))
    .catch(error => console.error("Error syncing database:", error));
*/
    
export default sequelize;
