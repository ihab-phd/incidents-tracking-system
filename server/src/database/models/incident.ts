/*  ---------------------------------------------------------------------
    --------------------- INCIDENT MODEL DEFINITION ---------------------
    ---------------------------------------------------------------------*/

import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import chalk from 'chalk';

// Defining the revision model
const Incident = sequelize.define('incident', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    tracker_id: {
        type: Sequelize.INTEGER
    },
    last_rev_id: {
        type: Sequelize.INTEGER
    }
});

console.log(chalk.bold.bgGreen('Incident Model is dDefined successfully'));
export default Incident;