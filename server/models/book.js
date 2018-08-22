const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

//making a model named Books whose entries have bookSchemas structure
module.exports = mongoose.model('Book', bookSchema)