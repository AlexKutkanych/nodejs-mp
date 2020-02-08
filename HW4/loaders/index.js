import Sequelize from 'sequelize';
import Users from './user';
import Groups from './group';
import GroupUsers from './groupUser';

module.exports = () => {
    const sequelize = new Sequelize('postgres', 'postgres', 'test1', {
        host: 'localhost',
        dialect: 'postgres'
    });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const db = {
        Users: Users(sequelize),
        Groups: Groups(sequelize),
        GroupUsers: GroupUsers(sequelize)
    };

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
      
      db.sequelize = sequelize;
      db.Sequelize = Sequelize;

      return db;
};

