import Joi from "joi";

export const formValidator = Joi.object({
    nickname: Joi.string().regex(/^[a-zA-Z0-9]{1,12}$/).required().messages({
        'string.pattern.base': 'nickname: You can use only Latin letters and it is required and length <= 12'
    }),
    real_name: Joi.string().regex(/^[A-Za-z]+$/).required().messages({
        'string.pattern.base': 'real_name: You can use only Latin letters and it is required'
    }),
    origin_description: Joi.string().required(),
    superpowers: Joi.string().required(),
    catch_phrase: Joi.string().required().regex(/^"([^"]*)"$/).messages({
        'string.pattern.base': 'You have to use "your text" in catch_phrase'
    })
})