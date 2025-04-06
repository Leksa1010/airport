import dotenv from "dotenv"
import { DataSource } from "typeorm";
import { Airline } from "./entities/Airline";
import { Ticket } from "./entities/Ticket";
import { User } from "./entities/User";
import path = require("path");

dotenv.config()

dotenv.config({ path: path.resolve(__dirname, './env') })


console.log("DB USER: ", process.env.DB_USER);
console.log("DB Password: ", process.env.DB_PASSWORD);
console.log("DB Host: ", process.env.DB_HOST);
console.log("DB Name: ", process.env.DB_NAME);
console.log("DB Port: ", process.env.DB_PORT);

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Airline, Ticket, User],
    logging: false
})