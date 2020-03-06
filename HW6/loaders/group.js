import Sequelize from 'sequelize';
import { Group } from '../models';
import defaultGroups from '../db/defaultGroups';

module.exports = (sequelize) => {
    const Groups = Group(sequelize, Sequelize);

    Groups.sync({ force: true }).then(() => {
        return Groups.bulkCreate(defaultGroups, { returning: true });
    });

    return Groups;
};

