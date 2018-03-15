"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
const chalk_1 = require("chalk");
const Incident = sequelize_2.default.define('incident', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.default.INTEGER
    },
    tracker_id: {
        type: sequelize_1.default.INTEGER
    },
    last_rev_id: {
        type: sequelize_1.default.INTEGER
    }
});
console.log(chalk_1.default.bold.bgGreen('Incident Model is dDefined successfully'));
exports.default = Incident;
