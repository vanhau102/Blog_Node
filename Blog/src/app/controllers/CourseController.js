const Course = require("../models/Course");
const {mongooseToObject} =require('../../util/mongoose');
const { render } = require("express/lib/response");
class CourseController {

    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course=>{
                res.render('courses/show',{ 
                    course:mongooseToObject(course)
                });
            })
            .catch(next);
    }

    create(req,res,next){
        res.render('courses/create');
    }
    store(req,res,next){
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi_webp/${req.body.videoId}/maxresdefault.webp`;

        const course = new Course(formData);

        course.save()
            .then(()=> res.redirect("/"))
            .catch((errr)=> {

            });


    }
}

module.exports = new CourseController();
