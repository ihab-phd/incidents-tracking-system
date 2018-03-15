"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../database/models/user");
const auth_1 = require("../../auth");
const chalk_1 = require("chalk");
function signup(req, res, next) {
    console.log(chalk_1.default.bold.bgGreen("users.controller -> signup -> user:" + req.body.userName));
    user_1.default.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if (user) {
            console.log(chalk_1.default.bold.bgGreen("users.controller -> signup -> user already exists!"));
            res.status(406).send('User already exists');
        }
        else {
            const pass = auth_1.default(req.body.password);
            user_1.default.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: pass,
                isTracker: false,
                role: 'User'
            }).then(user => {
                console.log(chalk_1.default.bold.bgGreen('users.controller -> signup -> success'));
                res.status(200).json(user);
            }).catch((err) => {
                console.log(chalk_1.default.bold.bgGreen("users.controller -> signup -> Error "));
                res.status(406).send('Error creating new user');
            });
        }
    }).catch(err => {
        console.log(chalk_1.default.bold.bgGreen("users.controller -> signup -> error"));
        res.status(404).send('Error checking userName');
    });
}
exports.signup = signup;
function getUserName(req, res) {
    console.log(chalk_1.default.bold.bgGreen("users.controller -> getUserName -> userID:" + req.param('id')));
    user_1.default.findOne({
        where: {
            id: req.param('id')
        }
    }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log(chalk_1.default.bold.bgGreen("users.controller -> getUserName -> error"));
        res.status(404).send('Incorrect userName');
    });
}
exports.getUserName = getUserName;
function signout(req, res) {
    req.logout();
    res.status(200).send('');
    console.log(chalk_1.default.bold.bgGreen('users.controller -> signout -> success'));
}
exports.signout = signout;
