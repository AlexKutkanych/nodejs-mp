'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Group, {
      foreignKey: 'userId',
      as: 'groups',
      onDelete: 'CASCADE',
    });
  };
  return User;
};