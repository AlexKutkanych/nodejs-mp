require('dotenv').config();
// module.exports = new Sequelize('postgres://postgres:test1@localhost/postgres')

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  }
};
