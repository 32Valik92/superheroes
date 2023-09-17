import express, {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import cors from "cors";

import {configs} from "./configs";
import {heroRouter} from "./routers";

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(
    cors()
);

app.use('/heroes', heroRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    return res.status(status).json({
        message: err.message,
        status: err.status,
    });
});

app.listen(configs.PORT, () => {
    mongoose.connect(configs.DB_URL);
    console.log(`Server has started on PORT ${configs.PORT}`);
});