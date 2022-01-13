const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxLenght: 255},
    description: { type: String, maxLenght: 6000},
    image: { type: String, maxLenght: 255},
    createdAt:{ type: Date , default: Date.now},
    updatedAt:{ type: Date , default: Date.now},
  });

module.exports =  mongoose.model('Course', Course);
