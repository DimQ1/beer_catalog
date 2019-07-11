const mongoose = require('mongoose');

const { Schema } = mongoose;

const beerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        unique: true,
        dropDups: true
    },
    propeties: {
        AlcoholByVolume: {
            type: Number,
            max: 14,
            min: 2
        },
        InternationalBitternessUnits: {
            type: Number,
            max: 120,
            min: 0
        },
        ColorByEuropeanBreweryConvention: {
            type: Number,
            max: 80,
            min: 4
        }
    },
    foodPairingList: [String],
    imageLink: String,
    description: String
});

const brewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        unique: true,
        dropDups: true
    },
    propeties: {
        AlcoholByVolume: {
            type: Number,
            max: 14,
            min: 2
        },
        InternationalBitternessUnits: {
            type: Number,
            max: 120,
            min: 0
        },
        ColorByEuropeanBreweryConvention: {
            type: Number,
            max: 80,
            min: 4
        }
    },
    foodPairingList: [String],
    imageLink: String,
    description: String
});

module.exports = mongoose.model('Beer', beerSchema);
