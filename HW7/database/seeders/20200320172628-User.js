module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        login: 'Jane Doe',
        password: 'Jane Doe',
        age: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'Jon Doe',
        password: 'jondoe@example.com',
        age: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};