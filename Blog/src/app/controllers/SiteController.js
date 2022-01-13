const Course = require('../models/Course')

class SiteController {
    index(rep, res) {
        Course.find({}, (err, course) => {
            if (!err) {
                res.json(course);
                return 
            }
            res.status(400).json({ error: 'ERROR!!!!' });
        })

        // res.render('home');
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
