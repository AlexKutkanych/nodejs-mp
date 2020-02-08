export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Groups-DB', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      permission: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false
      }
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.Users, {
      through: models.GroupUsers,
      as: 'users',
      foreignKey: 'groupId',
      onDelete: 'cascade'
    });
  };

  return Group;
}