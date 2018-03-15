"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const user_1 = require("./database/models/user");
const chalk_1 = require("chalk");
exports.default = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        user_1.default.findById(id).then(function (usr) {
            if (usr) {
                done(null, usr.get());
            }
            else {
                done(usr.errors, null);
            }
        });
    });
    passport.use(new passport_local_1.Strategy((username, password, done) => {
        user_1.default.findOne({
            where: {
                userName: username
            }
        }).then(function (usr) {
            if (!usr) {
                return done(null, false, { message: 'Unknown user' });
            }
            if (!usr.validatePasswordSync(password)) {
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, usr);
        });
    }));
    console.log(chalk_1.default.bold.bgGreen('Passpord is configured successfully'));
};
