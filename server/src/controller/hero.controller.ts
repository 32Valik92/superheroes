import {NextFunction, Request, Response} from "express";

import {IHero, IPaginationResponse, IQuery} from "../interfaces";
import {heroService} from "../services";

class HeroController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<IPaginationResponse<IHero>>> {
        try {
            const users = await heroService.getAllWithPagination(req.query as unknown as IQuery);

            return res.json(users);
        } catch (e) {
            next(e);
        }
    };

    public async getById(req: Request, res: Response, next: NextFunction): Promise<Response<IHero[]>> {
        try {
            const {id} = req.params;
            const users = await heroService.getById(id);

            return res.json(users);
        } catch (e) {
            next(e);
        }
    };

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<IHero>> {
        try {
            await heroService.create(req.body);

            return res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    };

    public async updateById(req: Request, res: Response, next: NextFunction): Promise<Response<IHero>> {
        try {
            const {id} = req.params;
            const updateHero = await heroService.updateById(id, req.body);

            return res.status(200).json(updateHero);
        } catch (e) {
            next(e);
        }
    };

    public async pushImageById(req: Request, res: Response, next: NextFunction): Promise<Response<IHero>> {
        try {
            const {id} = req.params;
            const updateHero = await heroService.pushImageById(id, req.body);

            return res.status(200).json(updateHero);
        } catch (e) {
            next(e);
        }
    };

    public async deleteById(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            const {id} = req.params;

            await heroService.deleteById(id);

            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    };

    public async deleteImage(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            const {id, index} = req.params;

            await heroService.deleteImage(id, +index);

            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    };
}

export const heroController = new HeroController();