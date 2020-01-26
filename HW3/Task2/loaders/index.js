import Sequelize from 'sequelize';
import userModel from '../models/index';
import defaultUsers from '../../defaultUsers';

module.exports = () => {
    const sequelize = new Sequelize('postgres', 'postgres', 'test1', {
        host: 'localhost',
        dialect: 'postgres'
    });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const Users = userModel(sequelize, Sequelize);

    Users.sync({ force: true }).then(() => {
        return Users.bulkCreate(defaultUsers, { returning: true });
    });

    return Users;
};

