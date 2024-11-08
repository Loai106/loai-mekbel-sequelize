import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database: "blogging-system",
    dialect:"mysql",
    username: "root",
    password : "M2823548r$!",
    models: [__dirname+"/models"]
})

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((error) => console.error('Unable to connect to the database:', error));


sequelize.sync({ alter: true , logging:false }) 
    .then(() => console.log("Database & tables synced"))
    .catch(error => console.error("Error syncing database:", error));

    
export default sequelize;
/*
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database: "blogging-system",
    dialect: "mysql",
    username: "root",
    password: "M2823548r$!",
    models: [__dirname + "/models"],
});

// Database connection and sync only if not in a test environment
if (process.env.NODE_ENV !== "test") {
    sequelize.authenticate()
        .then(() => console.log('Database connected...'))
        .catch((error) => console.error('Unable to connect to the database:', error));

    sequelize.sync({ alter: true, logging: false })
        .then(() => console.log("Database & tables synced"))
        .catch(error => console.error("Error syncing database:", error));
}

export default sequelize;
*/