const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxLenght: 255},
    description: { type: String, maxLenght: 6000},
    image: { type: String, maxLenght: 255},
    slug: { type: String},
    videoId: { type: String},
    slug: { type: String, slug: "name", unique: true},
  },{
    timestamps: true,
  });

module.exports =  mongoose.model('Course', Course);
