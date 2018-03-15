"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incidents = require("./incidents.controller");
exports.default = (app) => {
    app.route('/api/getAll').get(incidents.getAll);
    app.route('/api/getOne').get(incidents.getOne);
    app.route('/api/newIncident').post(incidents.newIncident);
    app.route('/api/updateIncident').put(incidents.updateIncident);
};
