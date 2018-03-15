/*  ---------------------------------------------------------------------
    ------------------------- DATABASE MAIN FILE ------------------------
    ---------------------------------------------------------------------*/

import sequelize from './sequelize'
import User from './models/user'
import Incident from './models/incident';
import Revision from './models/revision';
import chalk from 'chalk';
import generateHashSync from '../auth';

export default function () {

    //--------------------- Define Associations ---------------------

    Incident.hasMany(Revision, {foreignKey: 'incident_id', as:'revisions'});
    Revision.belongsTo(Incident, {foreignKey: 'incident_id'});
    console.log(chalk.bold.bgGreen('Model Associatoins is defined successfully'));

    //--------------------- Add admin users ---------------------

    sequelize.sync({ force: true }).then(
        () => {
            const pass = generateHashSync('admin');
            return User.create({
                firstName: 'Kyle',
                lastName: 'hisLast',
                userName: 'admin',
                password: pass,
                isTracker: true,
                role: 'Director of Technology'
            });
        }).then(
            (user) => {
                //console.log(chalk.bold.bgGreen('pass->' + user.firstName));
                const pas = generateHashSync('p1');
                return User.create({
                    firstName: 'i1',
                    lastName: 'm1',
                    userName: 'u1',
                    password: pas,
                    isTracker: false,
                    role: 'User'
                });
            }
        );

    console.log(chalk.bold.bgGreen('Admin users is added successfully'));
}