module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Groups',
    [
      {
        name: 'Jane Doe',
        permission: [''],
        userIds: [''],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jon Doe',
        permission: [''],
        userIds: [''],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};