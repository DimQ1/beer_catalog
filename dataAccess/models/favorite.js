const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    beers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'beer'
        }
    ]
});

module.exports = favoriteSchema;
