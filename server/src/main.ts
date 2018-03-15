import * as express from 'express';
import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from './database/models/user';
import configDB from './database/configDB';
import routeUsers from './modules/users/users.routes';
import routeIncidents from './modules/incidents/incidents.routes';
import * as morgan from 'morgan';
import * as compress from 'compression';  // compresses requests
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as session from 'express-session';
import * as bcrypt from 'bcrypt';
import chalk from 'chalk';

const app: express.Express = express();

//--------------------- Configure Database ---------------------
configDB();

//--------------------- Configure Express ---------------------
if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'prd') {
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
console.log(chalk.bold.bgGreen('Express is configured successfully'));

//--------------------- Configure Passport ---------------------
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(function(usr) {
        if(usr) {
            done(null, usr.get());
        } else {
            done(usr.errors, null);
        }
    });
});

passport.use(new LocalStrategy({usernameField: 'userName'},(username, password, done) => {
    User.findOne({
        where: {
            userName: username
        }
    }).then(function(user) {
        if(!user) {
            console.log(chalk.bold.bgGreen('passport -> use -> Unknown user'));
            return done(null, false, {message:'Unknown user'});
        }

        if(!bcrypt.compareSync(password, user.password)) {
            console.log(chalk.bold.bgGreen('passport -> use -> Invalid password'));
            return done(null, false, {message:'Invalid password'});
        }
        console.log(chalk.bold.bgGreen('passport -> use -> Success'));
        return done(null, user);
    });
}));
console.log(chalk.bold.bgGreen('Passpord is configured successfully'));

//--------------------- Route Routes ---------------------
routeUsers(app);
routeIncidents(app);

// set static folder to serve angular app
// app.use(express.static(path.join(__dirname, staticDir)));
app.listen(3000, () => console.log('app is listening on port 3000'));
