import {Schema, model} from "mongoose";

const heroSchema = new Schema({
    nickname: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    real_name: {
        type: String,
        require: true,
        trim: true,
    },
    origin_description: {
        type: String,
        trim: true,
    },
    superpowers: {
        type: String,
        trim: true,
    },
    catch_phrase: {
        type: String,
        trim: true,
    },
    image: {
        type: String
    },
    imagesList: {
        type: [String],
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Hero = model('heroes', heroSchema);
