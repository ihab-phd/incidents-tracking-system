/*  ---------------------------------------------------------------------
    -------------------------- INCIDENT CONTROLLERS -------------------------
    ---------------------------------------------------------------------*/

import User from '../../database/models/user';
import Incident from '../../database/models/incident';
import Revision from '../../database/models/revision';
import Sequelize from 'sequelize';
import chalk from 'chalk';

export function getAll(req, res, next) {
    if (req.user) {
        console.log(chalk.bold.bgGreen("incident.controller -> getAll -> isTracker:" + req.user.isTracker));
        if (req.user.isTracker) {
            Incident.findAll({
                where: {
                    tracker_id: req.user.id
                },
                include: [{
                    model: Revision,
                    //where: { incident_id: { $col: 'incident.last_rev_id' } },
                    as: 'revisions'
                }],
                raw: false
            }).then(incidents => {
                console.log(chalk.bold.bgGreen("incident.controller -> getAll -> tracker -> success"));
                res.status(200).json(incidents);
            }).catch(err => {
                console.log(chalk.bold.bgGreen("incident.controller -> getAll -> tracker -> error"));
                res.status(404).send('Error retreiving incidents');
            });
        } else {
            Incident.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [{
                    model: Revision,
                    //where: { incident_id: 'incident.last_rev_id'},
                    as: 'revisions'
                }],
                raw: false
            }).then(incidents => {
                console.log(chalk.bold.bgGreen("incident.controller -> getAll -> user -> success"));
                res.status(200).json(incidents);
            }).catch(err => {
                console.log(chalk.bold.bgGreen("incident.controller -> getAll -> user -> error"));
                res.status(404).send('Error retreiving incidents');
            });
        }
    } else {
        res.redirect('/signin');
    }
}


export function getOne(req, res, next) {
    if (req.user) {
        Revision.findOne({
            where: {
                id: req.param('id')
            }
        }).then(revision => {
            res.status(200).json(revision);
        }).catch(err => {
            console.log(chalk.bold.bgGreen("incident.controller -> getOne -> error"));
            res.status(404).send('Can\'t find the required revision');
        });
    } else {
        res.redirect('/signin');
    }

}


export function newIncident(req, res, next) {
    if (req.user) {
        console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> trackerNAme:' + req.body.trackerName));
        User.findOne({ where: {
            userName: req.body.trackerName
        }}).then((user) => {
            console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> get tracker_id -> ' + user.id));
            console.log(chalk.bold.bgGreen('Tracker userName:' + user.userName + ' firstName:' + user.firstName));
            Incident.create({
                user_id: req.user.id,
                tracker_id: user.id
            }).then((incident) => {
                console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> create incident'));
                Revision.create({
                    incident_id: incident.id,
                    date: req.body.date,
                    type: req.body.type,
                    short_desc: req.body.short_desc,
                    detailed_desc: req.body.detailed_desc,
                    cost: req.body.cost,
                    class: req.body.class,
                    resolution: ''
                }).then((revision) => {
                    console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> get revision'));
                    Incident.update({
                        last_rev_id: revision.id
                    }, {
                            where: {
                                id: revision.incident_id
                            }
                        }).then((incident) => {
                            console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> update incident -> success'));
                            res.status(200).json('ok');
                        }).catch((err) => {
                            console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> update incident -> error'));
                            res.status(404).send({error: 'Error updating the incident'});
                        })
                }).catch((err) => {
                    console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> get revision -> error'));
                    res.status(404).send({error: 'Error retreiving the related incident revision'});
                });
            }).catch((err) => {
                console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> create incident -> error'));
                res.status(404).send({error: 'Error creating the new incident'});
            })
        }).catch((err) => {
            console.log(chalk.bold.bgGreen('incident.controller -> newIncident -> get tracker_id -> error'));
            res.status(404).send('tracker userName is incorrect');
        });
    } else {
        res.redirect('/signin');
    }
}


export function updateIncident(req, res, next) {
    if (req.user) {
        Revision.create({
            incident_id: req.body.incident_id,
            date: req.body.date,
            type: req.body.type,
            short_desc: req.body.short_desc,
            detailed_desc: req.body.detailed_desc,
            cost: req.body.cost,
            class: req.body.class,
            resolution: req.body.resolution
        }).then( (revision) => {
            console.log(chalk.bold.bgGreen('incident.controller -> updateIncident -> create revision -> success'));
            Incident.update({
                last_rev_id: revision.id
            }, {
                    where: {
                        id: revision.incident_id
                    }
                }).then((incident) => {
                    console.log(chalk.bold.bgGreen('incident.controller -> updateIncident -> update incident -> success'));
                    res.status(200).json('ok');
                }).catch((err) => {
                    console.log(chalk.bold.bgGreen('incident.controller -> updateIncident -> update incident -> error'));
                    res.status(404).send('Error updating incident');
                })
        }).catch( (err) => {
            console.log(chalk.bold.bgGreen('incident.controller -> updateIncident -> create revision -> error'));
            res.status(404).send('Error creating the new revision');
        });
    } else {
        res.redirect('/signin');
    }
}

