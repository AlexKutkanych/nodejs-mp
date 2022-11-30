export default (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUsers', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return GroupUser;
};