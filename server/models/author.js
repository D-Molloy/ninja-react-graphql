const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const authorSchema = new Schema({
    name: String,
    age: Number
})

//making a model named Books whose entries have bookSchemas structure
module.exports = mongoose.model('authorSchema', authorSchema)