import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    migrations: [
        "./src/database/migrations/*.ts",
    ],
    entities: [User],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado!");
    })
    .catch((error) => {
        console.error(error);
    });