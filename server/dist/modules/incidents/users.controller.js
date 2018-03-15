"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../database/models/user");
const chalk_1 = require("chalk");
function signup(req, res, next) {
    if (!req.user) {
        user_1.default.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: user_1.default.generateHashSync(req.body.password),
            isTracker: false,
            role: 'User'
        }).then(user => {
            console.log(chalk_1.default.bold.bgGreen('New User created successfully'));
            req.login(user, (err) => {
                if (err)
                    return next(err);
                return res.redirect('/');
            });
        });
    }
    else {
        return res.redirect('/');
    }
}
exports.signup = signup;
function signout(req, res) {
    req.logout();
    console.log(chalk_1.default.bold.bgGreen('User Signout successfully'));
    res.redirect('/');
}
exports.signout = signout;
