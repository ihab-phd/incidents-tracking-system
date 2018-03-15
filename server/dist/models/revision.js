"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgconfig_1 = require("../database/config/pgconfig");
const chalk_1 = require("chalk");
const Revision = pgconfig_1.default.define('revision', {
    date: {
        type: sequelize_1.default.DATE,
        defaultValue: sequelize_1.default.NOW,
        validate: {
            isDate: true
        }
    },
    type: {
        type: sequelize_1.default.ENUM('Information Related', 'Non-Information Related')
    },
    short_desc: {
        type: sequelize_1.default.STRING
    },
    detailed_desc: {
        type: sequelize_1.default.TEXT
    },
    cost: {
        type: sequelize_1.default.REAL,
        validate: {
            isNumeric: true
        }
    },
    class: {
        type: sequelize_1.default.ENUM('Security Weakness', 'Minor Incident', 'Major Incident')
    },
    resolution: {
        type: sequelize_1.default.TEXT
    }
});
console.log(chalk_1.default.bold.bgGreen('Revision Model is defined successfully'));
exports.default = Revision;
