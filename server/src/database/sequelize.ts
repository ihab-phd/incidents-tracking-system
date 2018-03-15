/*  ---------------------------------------------------------------------
    -------------- CONFIGURE AND CREATE SEQUELIZE INSTANCE --------------
    ---------------------------------------------------------------------*/

import Sequelize from 'sequelize';
import chalk from 'chalk';

const sequelize = new Sequelize('hive_sec', 'postgres', 'sec', {
    host: 'localhost',
    dialect: 'postgres'
});

//--------------------- Check postgress connection ---------------------
sequelize
.authenticate()
.then(() => {
    console.log(chalk.bold.bgGreen('Postgres Connection has been established successfully.'));
})
.catch(err => {
    console.error(chalk.bold.bgRed('Unable to connect to the database:', err));
});

export default sequelize;