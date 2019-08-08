const Joi = require('@hapi/joi');

const imageLinkSchema = {
    path: Joi.string()
        .required(),
    description: Joi.string()
        .required()
};

const locationSchema = {
    type: Joi.string()
        .required(),
    coordinates: Joi.array()
        .items(
            Joi.number()
                .required(),
            Joi.number()
                .required()
        )
};

const beer = {
    body: {
        title: {
            name: Joi.string()
                .required(),
            tangle: Joi.string()
                .required()
        },
        propeties: {
            AlcoholByVolume: Joi.number(),
            InternationalBitternessUnits: Joi.number(),
            ColorByEuropeanBreweryConvention: Joi.number()
        },
        foodPairingList: Joi.array()
            .items(Joi.string()),
        imageLink: imageLinkSchema,
        description: Joi.string(),
        brew: {
            date: Joi.date(),
            location: locationSchema,
            ingredients: Joi.array()
                .items(
                    {
                        name: Joi.string()
                            .required(),
                        description: Joi.string()
                            .required()
                    }
                ),
            brewingMethod: Joi.string(),
            name: Joi.string(),
            images: Joi.array()
                .items(imageLinkSchema),
            impressions: Joi.string(),
            beerType: Joi.string()
        }
    }
};

const paramsBeerId = {
    params: {
        id: Joi.string()
            .min(24)
            .max(24)
            .required()
    }
};

module.exports = {
    beer,
    paramsBeerId
};
