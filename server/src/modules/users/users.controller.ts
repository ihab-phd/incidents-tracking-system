/*  ---------------------------------------------------------------------
    -------------------------- USER CONTROLLERS -------------------------
    ---------------------------------------------------------------------*/

import User from '../../database/models/user';
import generateHashSync from '../../auth';
import chalk from 'chalk';

export function signup(req, res, next) {
    console.log(chalk.bold.bgGreen("users.controller -> signup -> user:" + req.body.userName));
    const pass = generateHashSync(req.body.password);
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: pass,
        isTracker: false,
        role: 'User'
    }).then(user => {
        console.log(chalk.bold.bgGreen('users.controller -> signup -> success'));
        /*req.login(user, (err) => {
            if (err) return next(err);
            return res.redirect('/');
        });*/
        res.status(200).send(user);
    }).catch((err) => {
        console.log(chalk.bold.bgGreen("users.controller -> signup -> Error " + err))
        res.status(406).send(err);
    });
}

export function signout(req, res) {
    req.logout();
    res.status(200).send("");
    console.log(chalk.bold.bgGreen('users.controller -> signout -> success'));
}