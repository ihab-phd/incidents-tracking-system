/*  ---------------------------------------------------------------------
    --------------------- REVISION MODEL DEFINITION ---------------------
    ---------------------------------------------------------------------*/
    
import Sequelize from 'sequelize';
import sequelize from '../sequelize';
import chalk from 'chalk';

const Revision = sequelize.define('revision', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    incident_id: {
        type: Sequelize.INTEGER,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: true
        }
    },
    type: {
        type: Sequelize.ENUM('Information Related', 'Non-Information Related')
    },
    short_desc: {
        type: Sequelize.STRING
    },
    detailed_desc: {
        type: Sequelize.TEXT
    },
    cost: {
        type: Sequelize.REAL,
        validate: {
            isNumeric: true
        }
    },
    class: {
        type: Sequelize.ENUM('Security Weakness', 'Minor Incident', 'Major Incident')
    },
    resolution: {
        type: Sequelize.TEXT
    }
});

console.log(chalk.bold.bgGreen('Revision Model is defined successfully'));
export default Revision;