import {IHero, IImage, IPaginationResponse, IQuery} from "../interfaces";
import {Hero} from "../models";
import {ApiError} from "../errors";

class HeroService {
    // Pagination method
    public async getAllWithPagination(query: IQuery): Promise<IPaginationResponse<IHero>> {
        try {
            const {page = 1} = query;
            const skip = 5 * (+page - 1); // Formula for skipping prev pages

            const [heroes, heroesTotalCount] = await Promise.all([
                Hero.find().limit(5).skip(skip).sort({createdAt: -1}),
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
    };

    // Method for getting info about chosen hero
    public async getById(id: string): Promise<IHero> {
        return await this.getIneByIdOrThrow(id);
    };

    // Method for create hero
    public async create(data: IHero): Promise<void> {
        try {
            await Hero.create({...data});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    };

    // Method for update hero
    public async updateById(id: string, data: Partial<IHero>): Promise<IHero> {
        await this.getIneByIdOrThrow(id); // Checking if we have hero by that id

        return Hero.findOneAndUpdate(
            {_id: id},
            {...data},
            {returnDocument: "after"}
        );
    };

    // Method for add new image to hero's images list
    public async pushImageById(id: string, data: Partial<IImage>): Promise<IHero> {
        await this.getIneByIdOrThrow(id); // Checking if we have hero by that id

        return Hero.findOneAndUpdate(
            {_id: id},
            {$push: {imagesList: data.image}},
            {returnDocument: "after"}
        );
    };

    // Method for delete hero
    public async deleteById(id: string): Promise<void> {
        await this.getIneByIdOrThrow(id); // Checking if we have hero by that id

        await Hero.deleteOne({_id: id});
    };

    // Method for delete image from hero's images list
    public async deleteImage(id: string, index: number): Promise<void> {
        await Promise.all([
            this.getIneByIdOrThrow(id), // Checking if we have user by that id
            // Delete image by its index
            Hero.updateOne(
                {_id: id},
                // {$pull: {imagesList: `${imgData}`}}
                {$unset: {[`imagesList.${index}`]: 1}}
            ),
            // Delete null place after deleted image
            Hero.updateOne(
                {_id: id},
                {$pull: {imagesList: null}}
            )
        ])
    };

    // Method for checking if we have hero by this id
    private async getIneByIdOrThrow(id: string): Promise<IHero> {
        const hero = await Hero.findById({_id: id}) as IHero;

        if (!hero) {
            throw new ApiError("Hero is not found", 422);
        }

        return hero;
    };

}

export const heroService = new HeroService();