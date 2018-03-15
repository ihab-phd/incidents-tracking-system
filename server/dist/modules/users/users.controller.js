"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../database/models/user");
const auth_1 = require("../../auth");
const chalk_1 = require("chalk");
function signup(req, res, next) {
    console.log(chalk_1.default.bold.bgGreen("users.controller -> signup -> user:" + req.body.userName));
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
        res.status(200).send(user);
    }).catch((err) => {
        console.log(chalk_1.default.bold.bgGreen("users.controller -> signup -> Error " + err));
        res.status(406).send(err);
    });
}
exports.signup = signup;
function signout(req, res) {
    req.logout();
    res.status(200).send("");
    console.log(chalk_1.default.bold.bgGreen('users.controller -> signout -> success'));
}
exports.signout = signout;
