const getUserById = (Users, id) => Users.findByPk(id);
const createUser = (Users, userData) => Users.create(userData);
const deleteUser = (Users, id) => Users.destroy({ where: { id } });

module.exports = {
    getUserById,
    createUser,
    deleteUser
};

