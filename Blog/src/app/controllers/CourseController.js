const Course = require("../models/Course");
const { mongooseToObject } = require('../../util/mongoose');
const { render } = require("express/lib/response");
class CourseController {

    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                });
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('courses/create');
    }
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi_webp/${req.body.videoId}/maxresdefault.webp`;
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect("/"))
            .catch((errr) => {
            });
    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch(next);
    }
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi_webp/${req.body.videoId}/maxresdefault.webp`;
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
    restore(req, res, next){
        Course.restore({ _id: req.params.id })
        .then(() => res.redirect("back"))
        .catch(next);
    }

}

module.exports = new CourseController();
