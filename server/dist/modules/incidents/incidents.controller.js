"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../database/models/user");
const incident_1 = require("../../database/models/incident");
const revision_1 = require("../../database/models/revision");
const chalk_1 = require("chalk");
function getAll(req, res, next) {
    if (req.user) {
        console.log(chalk_1.default.bold.bgGreen("incident.controller -> getAll -> isTracker:" + req.user.isTracker));
        if (req.user.isTracker) {
            incident_1.default.findAll({
                where: {
                    tracker_id: req.user.id
                },
                include: [{
                        model: revision_1.default,
                        as: 'revisions'
                    }],
                raw: false
            }).then(incidents => {
                console.log(chalk_1.default.bold.bgGreen("incident.controller -> getAll -> tracker -> success"));
                res.status(200).json(incidents);
            }).catch(err => {
                console.log(chalk_1.default.bold.bgGreen("incident.controller -> getAll -> tracker -> error"));
            });
        }
        else {
            incident_1.default.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [{
                        model: revision_1.default,
                        as: 'revisions'
                    }],
                raw: false
            }).then(incidents => {
                console.log(chalk_1.default.bold.bgGreen("incident.controller -> getAll -> user -> success"));
                res.status(200).json(incidents);
            }).catch(err => {
                console.log(chalk_1.default.bold.bgGreen("incident.controller -> getAll -> user -> error"));
                return err;
            });
        }
    }
    else {
        res.redirect('/signin');
    }
}
exports.getAll = getAll;
function getOne(req, res, next) {
    if (req.user) {
        revision_1.default.findOne({
            where: {
                id: req.param('id')
            }
        }).then(revision => {
            res.json(revision);
        });
    }
    else {
        res.redirect('/signin');
    }
}
exports.getOne = getOne;
function newIncident(req, res, next) {
    if (req.user) {
        user_1.default.findOne({
            userName: req.user.userName
        }).then((user) => {
            console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> get tracker_id'));
            incident_1.default.create({
                user_id: req.user.id,
                tracker_id: user.id
            }).then((incident) => {
                console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> create incident'));
                revision_1.default.create({
                    incident_id: incident.id,
                    date: req.body.date,
                    type: req.body.type,
                    short_desc: req.body.short_desc,
                    detailed_desc: req.body.detailed_desc,
                    cost: req.body.cost,
                    class: req.body.class,
                    resolution: ''
                }).then((revision) => {
                    console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> get revision'));
                    incident_1.default.update({
                        last_rev_id: revision.id
                    }, {
                        where: {
                            id: revision.incident_id
                        }
                    }).then((incident) => {
                        console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> update incident -> success'));
                        res.json("ok");
                    }).catch((err) => {
                        console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> update incident -> error'));
                    });
                }).catch((err) => {
                    console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> get revision -> error'));
                });
            }).catch((err) => {
                console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> create incident -> error'));
            });
        }).catch((err) => {
            console.log(chalk_1.default.bold.bgGreen('incident.controller -> newIncident -> get tracker_id -> error'));
        });
    }
    else {
        res.redirect('/signin');
    }
}
exports.newIncident = newIncident;
function updateIncident(req, res, next) {
    if (req.user) {
        revision_1.default.create({
            incident_id: req.body.incident_id,
            date: req.body.date,
            type: req.body.type,
            short_desc: req.body.short_desc,
            detailed_desc: req.body.detailed_desc,
            cost: req.body.cost,
            class: req.body.class,
            resolution: req.body.resolution
        }).then((revision) => {
            console.log(chalk_1.default.bold.bgGreen('incident.controller -> updateIncident -> create revision -> success'));
            incident_1.default.update({
                last_rev_id: revision.id
            }, {
                where: {
                    id: revision.incident_id
                }
            }).then((incident) => {
                console.log(chalk_1.default.bold.bgGreen('incident.controller -> updateIncident -> update incident -> success'));
                res.json("ok");
            }).catch((err) => {
                console.log(chalk_1.default.bold.bgGreen('incident.controller -> updateIncident -> update incident -> error'));
            });
        }).catch((err) => {
            console.log(chalk_1.default.bold.bgGreen('incident.controller -> updateIncident -> create revision -> error'));
        });
    }
    else {
        res.redirect('/signin');
    }
}
exports.updateIncident = updateIncident;
