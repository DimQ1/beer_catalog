const mongoose = require('mongoose');

const { Schema } = mongoose;
const imageLinkSchema = require('./imageLink');

const brewSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:
        {
            type: [Number],
            require: true
        }
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }

        }
    ],
    brewingMethod: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    images: [imageLinkSchema],
    impressions: String,
    beerType: {
        type: String,
        required: true,
        enum: ['Ale', 'Lager', 'Stout', 'Porter', 'Lambic', 'Pilsner', 'Pale Ale', 'Weissbier', 'Belgan Ale']
    }
});

module.exports = brewSchema;
