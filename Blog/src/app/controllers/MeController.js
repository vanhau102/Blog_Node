const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()]).then(
            ([course, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    course: multipleMongooseToObject(course),
                }),
        );
        // Course.countDocumentsDeleted({})
        // 	.then((deleteCount) => {
        // 		console.log(deleteCount);
        // 	})
        // 	.catch(() => { })

        // Course.find({})
        // 	.then(course => res.render('me/stored-courses', {
        // 		course: multipleMongooseToObject(course)
        // 	}))
        // 	.catch(next);
    }
    // [GET] me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((course) =>
                res.render('me/trash-courses', {
                    course: multipleMongooseToObject(course),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
