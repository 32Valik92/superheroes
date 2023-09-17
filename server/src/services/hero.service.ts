import {IHero, IPaginationResponse, IQuery} from "../interfaces";
import {Hero} from "../models";
import {ApiError} from "../errors";

class HeroService {
    public async getAllWithPagination(query: IQuery): Promise<IPaginationResponse<IHero>> {
        try {
            const {page = 1} = query;
            const skip = 5 * (+page - 1);

            const [heroes, heroesTotalCount] = await Promise.all([
                Hero.find().limit(5).skip(skip).sort({ createdAt: -1 }),
                Hero.count()
            ]);

            return {
                page: +page,
                itemsCount: heroesTotalCount,
                data: heroes as IHero[]
            };
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async getById(id: string): Promise<IHero> {
        return await this.getIneByIdOrThrow(id);
    }

    public async create(data: IHero): Promise<void> {
        try {
            await Hero.create({...data});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async updateById(id: string, data: Partial<IHero>): Promise<IHero> {
        await this.getIneByIdOrThrow(id);

        return Hero.findOneAndUpdate(
            {_id: id},
            {...data},
            {returnDocument: "after"}
        );
    }

    public async deleteById(id: string): Promise<void> {
        await this.getIneByIdOrThrow(id);

        await Hero.deleteOne({_id: id});
    }

    private async getIneByIdOrThrow(id: string): Promise<IHero> {
        const hero = await Hero.findById({_id: id}) as IHero;

        if (!hero) {
            throw new ApiError("Hero is not found", 422);
        }

        return hero;
    }

}

export const heroService = new HeroService();