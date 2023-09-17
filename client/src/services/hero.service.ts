import {IRes} from "../types";
import {IHero} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IPagination} from "../interfaces/pagination.interface";

class HeroService {
    getAll(page: number = 1): IRes<IPagination<IHero[]>> {
        return axiosService.get(urls.toHeroes, {params: {page}})
    };

    getById(id: string): IRes<IHero> {
        return axiosService.get(urls.heroById(id));
    };

    create(hero: IHero): IRes<IHero> {
        return axiosService.post(urls.toHeroes, hero)
    };

    updateById(id: string, hero: IHero): IRes<IHero> {
        return axiosService.put(urls.heroById(id), hero)
    };

    deleteById(id: string): IRes<void> {
        return axiosService.delete(urls.heroById(id))
    }
}

export const heroService = new HeroService()