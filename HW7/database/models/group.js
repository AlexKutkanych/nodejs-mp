'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    permission: DataTypes.ARRAY(DataTypes.STRING),
    userIds: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Group.associate = function(models) {
    Group.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  };
  return Group;
};