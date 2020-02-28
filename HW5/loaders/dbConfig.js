import Sequelize from 'sequelize';

module.exports = new Sequelize('postgres', 'postgres', 'test1', {
  host: 'localhost',
  dialect: 'postgres'
});