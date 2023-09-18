import {IRes} from "../types";
import {IHero, IImage, IPagination} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";

class HeroService {
    // Method for getting pagination array of heroes
    getAll(page: number = 1): IRes<IPagination<IHero[]>> {
        return axiosService.get(urls.toHeroes, {params: {page}});
    };

    // Method for getting hero by id
    getById(id: string): IRes<IHero> {
        return axiosService.get(urls.heroById(id));
    };

    // Method for creating
    create(hero: IHero): IRes<IHero> {
        return axiosService.post(urls.toHeroes, hero);
    };

    // Method for updating
    updateById(id: string, hero: IHero): IRes<IHero> {
        return axiosService.put(urls.heroById(id), hero);
    };

    // Method for delete
    deleteById(id: string): IRes<void> {
        return axiosService.delete(urls.heroById(id));
    };

    // Method for pushing image to chosen hero
    pushImageById(id: string, imageData: IImage): IRes<void> {
        return axiosService.put(urls.pushImage(id), imageData);
    };

    // Method for delete image from chosen hero
    deleteImage(id: string, index: number): IRes<void> {
        return axiosService.delete(urls.deleteImage(id, index));
    };
}

export const heroService = new HeroService()