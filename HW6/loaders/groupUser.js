import Sequelize from 'sequelize';
import { GroupUser } from '../models';

module.exports = (sequelize) => {
    const GroupUsers = GroupUser(sequelize, Sequelize);

    GroupUsers.sync({ force: true }).then(() => {
        GroupUsers.bulkCreate({}, { returning: true });
    });

    return GroupUsers;
};

