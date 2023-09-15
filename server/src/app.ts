import express, {Request, Response} from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

// CRUD - create, read, update, delete

app.get("/heroes", (req: Request, res: Response) => {
    res.status(200);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`);
});