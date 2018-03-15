"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const passport_local_1 = require("passport-local");
const user_1 = require("./database/models/user");
const configDB_1 = require("./database/configDB");
const users_routes_1 = require("./modules/users/users.routes");
const incidents_routes_1 = require("./modules/incidents/incidents.routes");
const morgan = require("morgan");
const compress = require("compression");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const bcrypt = require("bcrypt");
const chalk_1 = require("chalk");
const app = express();
configDB_1.default();
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
passport.use(new passport_local_1.Strategy({ usernameField: 'userName' }, (username, password, done) => {
    user_1.default.findOne({
        where: {
            userName: username
        }
    }).then(function (user) {
        if (!user) {
            console.log(chalk_1.default.bold.bgGreen('passport -> use -> Unknown user'));
            return done(null, false, { message: 'Unknown user' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            console.log(chalk_1.default.bold.bgGreen('passport -> use -> Invalid password'));
            return done(null, false, { message: 'Invalid password' });
        }
        console.log(chalk_1.default.bold.bgGreen('passport -> use -> Success'));
        return done(null, user);
    });
}));
console.log(chalk_1.default.bold.bgGreen('Passpord is configured successfully'));
users_routes_1.default(app);
incidents_routes_1.default(app);
app.listen(3000, () => console.log('app is listening on port 3000'));
