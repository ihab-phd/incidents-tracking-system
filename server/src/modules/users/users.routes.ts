/*  ---------------------------------------------------------------------
    ---------------------------- USER ROUTES ----------------------------
    ---------------------------------------------------------------------*/

import * as express from 'express';
import * as users from './users.controller';
import * as passport from 'passport';
import { RequestUser } from './req_userDef';

export default (app: express.Express): void => {
    app.route('/api/signup').post(users.signup);
    app.route('/api/signin').post(passport.authenticate('local'),
        function (req: RequestUser, res) {
            res.status(200).send(req.user);
        });
    app.route('/api/signout').get(users.signout);
    app.route('/api/getUserName').get(users.getUserName);
};
