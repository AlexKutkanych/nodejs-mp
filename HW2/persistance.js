import storage from 'node-persist';
import Users from'./db';

const persistUsers = async () => {
    await storage.init();
    await storage.setItem('users', Users);
    return await storage.getItem('users');
};

module.exports = persistUsers;