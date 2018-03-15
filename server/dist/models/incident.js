"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgconfig_1 = require("../database/config/pgconfig");
const chalk_1 = require("chalk");
const Incident = pgconfig_1.default.define('incident', {
    last_rev_id: {
        type: sequelize_1.default.INTEGER
    }
});
console.log(chalk_1.default.bold.bgGreen('Incident Model is dDefined successfully'));
exports.default = Incident;
