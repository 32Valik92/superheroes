import {config} from "dotenv";

config();

export const configs = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    FRONT_URL: process.env.FRONT_URL
}