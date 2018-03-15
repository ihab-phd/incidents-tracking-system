/*  ---------------------------------------------------------------------
    -------------------------- USER CONTROLLERS -------------------------
    ---------------------------------------------------------------------*/

import User from '../../database/models/user';
import generateHashSync from '../../auth';
import chalk from 'chalk';

export function signup(req, res, next) {
    console.log(chalk.bold.bgGreen("users.controller -> signup -> user:" + req.body.userName));
    User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if (user) {
            console.log(chalk.bold.bgGreen("users.controller -> signup -> user already exists!"));
            res.status(406).send('User already exists');
        } else {
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
                res.status(200).json(user);
            }).catch((err) => {
                console.log(chalk.bold.bgGreen("users.controller -> signup -> Error "))
                res.status(406).send('Error creating new user');
            });
        }
    }).catch(err => {
        console.log(chalk.bold.bgGreen("users.controller -> signup -> error"));
        res.status(404).send('Error checking userName');
    });
}

export function getUserName(req, res) {
    console.log(chalk.bold.bgGreen("users.controller -> getUserName -> userID:" + req.param('id')));
    User.findOne({
        where: {
            id: req.param('id')
        }
    }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log(chalk.bold.bgGreen("users.controller -> getUserName -> error"));
        res.status(404).send('Incorrect userName');
    });
}

export function signout(req, res) {
    req.logout();
    res.status(200).send('');
    console.log(chalk.bold.bgGreen('users.controller -> signout -> success'));
}