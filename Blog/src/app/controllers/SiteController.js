const User = require('../models/User');
const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('home', {
                    course: multipleMongooseToObject(course),
                });
            })
            .catch(next);
    }
    search(req, res, next) {
        res.render('search');
    }
}

module.exports = new SiteController();
