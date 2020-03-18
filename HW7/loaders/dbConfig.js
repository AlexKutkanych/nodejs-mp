import Sequelize from 'sequelize';

const { DATABASE, DB_USERNAME, DB_PASSWORD, HOST, DIALECT } = process.env;

module.exports = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: HOST,
  dialect: DIALECT
});