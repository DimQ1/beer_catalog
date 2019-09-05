const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageLinkSchema = new Schema(
    {
        path: {
            type: String,
            required: true
        },
        description: String
    }
);

module.exports = imageLinkSchema;
