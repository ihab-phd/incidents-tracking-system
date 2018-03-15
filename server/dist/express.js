"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const compress = require("compression");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const chalk_1 = require("chalk");
exports.default = (app) => {
    if (process.env.NODE_ENV === 'dev') {
        app.use(morgan('dev'));
    }
    else if (process.env.NODE_ENV === 'prd') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'Area51'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    console.log(chalk_1.default.bold.bgGreen('Express is configured successfully'));
    return passport;
};
