import {Router} from "express";

import {heroController} from "../controller";
import {heroMiddleware} from "../middlewares";

const router = Router();

// CRUD - create, read, update, delete

router.get("/", heroController.getAll);

router.get("/:id",
    heroMiddleware.idValid("id"),
    heroController.getById
);

router.post("/", heroController.create);

router.put(
    "/:id",
    heroMiddleware.idValid("id"),
    heroController.updateById
);

router.delete("/:id",
    heroMiddleware.idValid("id"),
    heroController.deleteById
);

export const heroRouter = router;