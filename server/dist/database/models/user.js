"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
const chalk_1 = require("chalk");
const User = sequelize_2.default.define('user', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.default.STRING
    },
    lastName: {
        type: sequelize_1.default.STRING
    },
    userName: {
        type: sequelize_1.default.STRING
    },
    password: {
        type: sequelize_1.default.STRING
    },
    isTracker: {
        type: sequelize_1.default.BOOLEAN
    },
    role: {
        type: sequelize_1.default.ENUM('User', 'Director of Technology', 'Director of Quality')
    }
}, {
    indexes: [{
            unique: true,
            fields: ['userName']
        }]
});
console.log(chalk_1.default.bold.bgGreen('User Model is defined successfully'));
exports.default = User;
