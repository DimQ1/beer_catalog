const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
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

module.exports = mongoose.model('Favorite', favoriteSchema);
