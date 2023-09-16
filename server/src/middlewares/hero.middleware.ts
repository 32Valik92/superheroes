import {NextFunction, Request, Response} from "express";
import {isObjectIdOrHexString} from "mongoose";

import {ApiError} from "../errors";

class HeroMiddleware {
    public idValid(idParam: string) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const id = req.params[idParam];

                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError('Id is not valid', 400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const heroMiddleware = new HeroMiddleware();