"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pgconfig_1 = require("./config/pgconfig");
const user_1 = require("../models/user");
const incident_1 = require("../models/incident");
const revision_1 = require("../models/revision");
const chalk_1 = require("chalk");
function default_1() {
    user_1.default.hasMany(incident_1.default, { foreignKey: 'user_id' });
    user_1.default.hasMany(incident_1.default, { foreignKey: 'tracker_id' });
    incident_1.default.hasMany(revision_1.default, { foreignKey: 'incident_id' });
    console.log(chalk_1.default.bold.bgGreen('Model Associatoins is defined successfully'));
    pgconfig_1.default.sync({ force: true }).then(() => {
        return user_1.default.create({
            firstName: 'Kyle',
            lastName: 'hisLast',
            userName: 'admin',
            password: 'admin',
            isTracker: true,
            role: 'Director of Technology'
        });
    });
    console.log(chalk_1.default.bold.bgGreen('Admin users is added successfully'));
}
exports.default = default_1;
