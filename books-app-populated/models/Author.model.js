const { Schema, model } = require('mongoose');

const authorSchema = new Schema(
    {
        name: String,
        lastName: String,
        nationality: String,
        birthday: Date,
        pictureUrl: String
    },
    {
        timestamps: true
    }
);

module.exports = model('Author', authorSchema)