const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        fullname: { type: String, maxLenght: 255 },
        email: { type: String, maxLenght: 6000 },
        password: { type: String, maxLenght: 20, minLength: 8 },
        image: { type: String, maxLenght: 255 },
    },
    {
        timestamps: true,
    },
);

//Add plugin
mongoose.plugin(slug);
User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('User', User);
