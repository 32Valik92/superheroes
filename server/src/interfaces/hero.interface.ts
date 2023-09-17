import {Types} from "mongoose";

export interface IHero {
    _id: Types.ObjectId;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    image: string;
    imagesList: string[];
}