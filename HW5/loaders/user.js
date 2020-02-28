import Sequelize from 'sequelize';
import { User } from '../models';
import defaultUsers from '../db/defaultUsers';

module.exports = (sequelize) => {
    const Users = User(sequelize, Sequelize);

    Users.sync({ force: true }).then(() => {
        Users.bulkCreate(defaultUsers, { returning: true });
    });

    return Users;
};

