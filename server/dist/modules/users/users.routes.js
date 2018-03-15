"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = require("./users.controller");
const passport = require("passport");
exports.default = (app) => {
    app.route('/api/signup').post(users.signup);
    app.route('/api/signin').post(passport.authenticate('local'), function (req, res) {
        res.status(200).send(req.user);
    });
    app.route('/api/signout').get(users.signout);
    app.route('/api/getUserName').get(users.getUserName);
};
