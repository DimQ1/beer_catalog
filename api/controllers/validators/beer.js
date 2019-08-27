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

const brewSchema = {
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
            alcoholByVolume: Joi.number(),
            internationalBitternessUnits: Joi.number(),
            colorByEuropeanBreweryConvention: Joi.number()
        },
        foodPairingList: Joi.array()
            .items(Joi.string()),
        imageLink: imageLinkSchema,
        description: Joi.string(),
        brew: brewSchema
    }
};

module.exports = {
    beer
};
