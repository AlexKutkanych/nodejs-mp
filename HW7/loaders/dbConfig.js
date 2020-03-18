import Sequelize from 'sequelize';

// const { DATABASE, USERNAME, PASSWORD, HOST, DIALECT } = process.env;

module.exports = new Sequelize('postgres', 'postgres', 'test1', {
  host: 'localhost',
  dialect: 'postgres'
});