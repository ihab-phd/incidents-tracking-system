/*  ---------------------------------------------------------------------
    ---------------------------- INCIDENT ROUTES ----------------------------
    ---------------------------------------------------------------------*/

import * as express from 'express';
import * as incidents from './incidents.controller';
import * as passport from 'passport';

export default (app: express.Express): void => {
    app.route('/api/getAll').get(incidents.getAll);
    app.route('/api/getOne').get(incidents.getOne);
    app.route('/api/newIncident').post(incidents.newIncident);
    app.route('/api/updateIncident').put(incidents.updateIncident);
};
