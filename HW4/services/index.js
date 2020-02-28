const getAllItems = DB => DB.findAll();
const getItemById = (DB, id) => DB.findByPk(id);
const createItem = (DB, data) => DB.create(data);
const deleteItem = (DB, id) => DB.destroy({ where: { id } });

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    deleteItem
};

