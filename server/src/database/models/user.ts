/*  ---------------------------------------------------------------------
    ----------------------- USER MODEL DEFINITION -----------------------
    ---------------------------------------------------------------------*/

import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import * as bcrypt from 'bcrypt';
import chalk from 'chalk';

//const saltRounds = 10;  // 2^slatRounds iteration to hash

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    userName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    isTracker: {
        type: Sequelize.BOOLEAN
    },
    role: {
        type: Sequelize.ENUM('User', 'Director of Technology', 'Director of Quality')
    }
},
    {
        indexes: [{
            unique:true,
            fields: ['userName']
        }]
    });

console.log(chalk.bold.bgGreen('User Model is defined successfully'));
export default User;