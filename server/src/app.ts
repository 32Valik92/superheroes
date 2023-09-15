import express, {Request, Response} from "express";
import * as mongoose from "mongoose";
import cors from "cors";

import {configs} from "./configs";
import {Hero} from "./models/Hero.model";
import {IUser} from "./interfaces";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
        credentials: true,
        origin: configs.FRONT_URL,
    })
);

// CRUD - create, read, update, delete

app.get("/heroes", async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
        const users = await Hero.find();

        return res.json(users);
    } catch (e) {
        console.log(e);
    }
});

app.post("/heroes", async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
        const createdHero = await Hero.create(req.body);

        return res.status(201).json(createdHero);
    } catch (e) {
        console.log(e)
    }
})

app.put(
    "/heroes/:id",
    async (req: Request, res: Response): Promise<Response<IUser>> => {
        try {
            const {id} = req.params;

            const updateHero = await Hero.findOneAndUpdate(
                {_id: id},
                {...req.body},
                {returnDocument: "after"}
            );

            return res.status(200).json(updateHero);
        } catch (e) {
            console.log(e);
        }
    }
);

app.delete("/heroes/:id", async (req: Request, res: Response): Promise<Response<void>> => {
    try {
        const {id} = req.params;

        await Hero.deleteOne({_id: id});

        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
    }
});

app.listen(configs.PORT, () => {
    mongoose.connect(configs.DB_URL);
    console.log(`Server has started on PORT ${configs.PORT}`);
});