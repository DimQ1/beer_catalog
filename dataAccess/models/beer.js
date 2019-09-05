const mongoose = require('mongoose');

const { Schema } = mongoose;
const imageLinkSchema = require('./imageLink');
const brewSchema = require('./brew');

const beerSchema = new Schema({
    title: {
        name: {
            type: String,
            required: true,
            unique: true,
            dropDups: true
        },
        tangle: {
            type: String,
            required: true
        }
    },
    propeties: {
        alcoholByVolume: {
            type: Number,
            max: 14,
            min: 2
        },
        internationalBitternessUnits: {
            type: Number,
            max: 120,
            min: 0
        },
        colorByEuropeanBreweryConvention: {
            type: Number,
            max: 80,
            min: 4
        }
    },
    foodPairingList: [String],
    imageLink: imageLinkSchema,
    description: String,
    brew: brewSchema
});

module.exports = mongoose.model('Beer', beerSchema);
