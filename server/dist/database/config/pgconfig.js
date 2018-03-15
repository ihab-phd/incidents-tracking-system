"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const chalk_1 = require("chalk");
const sequelize = new sequelize_1.default('hive_sec', 'postgres', 'sec', {
    host: 'localhost',
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
    console.log(chalk_1.default.bold.bgGreen('Postgres Connection has been established successfully.'));
})
    .catch(err => {
    console.error(chalk_1.default.bold.bgRed('Unable to connect to the database:', err));
});
exports.default = sequelize;
