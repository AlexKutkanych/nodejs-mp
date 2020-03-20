export default (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
      login: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      age: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: 'false'
      }
  });

  User.associate = (models) => {
    User.belongsToMany(models.Groups, {
      through: models.GroupUsers,
      as: 'groups',
      foreignKey: 'userId',
      onDelete: 'cascade'
    });
  };

  return User;
};

