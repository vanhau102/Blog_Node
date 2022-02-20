const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');



class UserController {
    index(req, res, next) {
        User.find({}).then((users) => {
            console.log('Users: ', users);

            res.render('user/users-list', {
                users: multipleMongooseToObject(users),
            });
        });
    }

    create(req, res, next) {
        res.render('user/create');
    }
    logup(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => res.redirect('/user'))
            .catch(next);
    }

    edit(req, res, next) {
        User.findById(req.params.id)
            .then((user) =>
                res.render('user/edit', {
                    user: mongooseToObject(user),
                }),
            )
            .catch(next);
    }
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user'))
            .catch(next);
    }
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/user'))
            .catch(next);
    }
}

module.exports = new UserController();
