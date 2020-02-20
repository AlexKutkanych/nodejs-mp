import logger from '../logger';

const getAllItems = DB => DB.findAll();
const getItemById = (DB, id) => DB.findByPk(id);
const createItem = (DB, data) => DB.create(data);
const deleteItem = (DB, id) => DB.destroy({ where: { id } });
const createLog = (name, ...args) => {
    logger.info(`Method ${name} has been called | data: ${JSON.stringify({DB: args[0].name, userId: args[1]})}`);
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    deleteItem,
    createLog
};

