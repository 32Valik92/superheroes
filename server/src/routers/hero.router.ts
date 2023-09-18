import {Router} from "express";

import {heroController} from "../controller";
import {heroMiddleware} from "../middlewares";

const router = Router();

// CRUD - create, read, update, delete

// Get all heroes
router.get("/", heroController.getAll);

// get one hero
router.get("/:id",
    heroMiddleware.idValid("id"),
    heroController.getById
);

// Create hero
router.post("/", heroController.create);

// Update hero
router.put(
    "/:id",
    heroMiddleware.idValid("id"),
    heroController.updateById
);

// Delete hero
router.delete("/:id",
    heroMiddleware.idValid("id"),
    heroController.deleteById
);

// Add image to hero's images list
router.put(
    "/image/:id",
    heroController.pushImageById
);

// Delete image from hero's images list
router.delete(
    "/image/:id/:index",
    heroController.deleteImage
);

export const heroRouter = router;