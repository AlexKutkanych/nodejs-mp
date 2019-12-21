const storage = require('node-persist');
const Users = require('./db');

async function persistUsers() {
    await storage.init();
    await storage.setItem('users', Users);
    return await storage.getItem('users');
};

module.exports = persistUsers;