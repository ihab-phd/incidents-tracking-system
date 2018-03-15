"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const user_1 = require("./models/user");
const incident_1 = require("./models/incident");
const revision_1 = require("./models/revision");
const chalk_1 = require("chalk");
const auth_1 = require("../auth");
function default_1() {
    incident_1.default.hasMany(revision_1.default, { foreignKey: 'incident_id', as: 'revisions' });
    revision_1.default.belongsTo(incident_1.default, { foreignKey: 'incident_id' });
    console.log(chalk_1.default.bold.bgGreen('Model Associatoins is defined successfully'));
    sequelize_1.default.sync({ force: true }).then(() => {
        const pass = auth_1.default('admin');
        return user_1.default.create({
            firstName: 'Kyle',
            lastName: 'hisLast',
            userName: 'kyle',
            password: pass,
            isTracker: true,
            role: 'Director of Technology'
        });
    }).then((user) => {
        const pas = auth_1.default('admin');
        return user_1.default.create({
            firstName: 'Tyler',
            lastName: 'hisLast',
            userName: 'tyler',
            password: pas,
            isTracker: true,
            role: 'Director of Quality'
        });
    }).then((user) => {
        const pas = auth_1.default('p1');
        return user_1.default.create({
            firstName: 'i1',
            lastName: 'm1',
            userName: 'u1',
            password: pas,
            isTracker: false,
            role: 'User'
        });
    }).then((user) => {
        const pas = auth_1.default('p2');
        return user_1.default.create({
            firstName: 'i2',
            lastName: 'm2',
            userName: 'u2',
            password: pas,
            isTracker: false,
            role: 'User'
        });
    });
    console.log(chalk_1.default.bold.bgGreen('Admin users is added successfully'));
}
exports.default = default_1;
