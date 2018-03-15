"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgconfig_1 = require("../database/config/pgconfig");
const bcrypt_1 = require("bcrypt");
const chalk_1 = require("chalk");
const saltRounds = 10;
const User = pgconfig_1.default.define('user', {
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
        type: sequelize_1.default.ENUM('Director of Technology', 'Director of Quality')
    }
}, {
    classMethods: {
        generateHashSync: function (password) {
            return bcrypt_1.default.hashSync(password, saltRounds);
        }
    },
    instanceMethods: {
        validatePasswordSync: function (password) {
            return bcrypt_1.default.compareSync(password, this.password);
        }
    }
});
console.log(chalk_1.default.bold.bgGreen('User Model is defined successfully'));
exports.default = User;
