import jwt from 'jsonwebtoken';
import logger from '../logger/logger';

const getAllItems = DB => DB.findAll();
const getItemById = (DB, id) => DB.findByPk(id);
const createItem = (DB, data) => DB.create(data);
const deleteItem = (DB, id) => DB.destroy({ where: { id } });
const createLog = (name, ...args) => {
    logger.info(`Method ${name} has been called | data: ${JSON.stringify({DB: args[0].name, userId: args[1]})}`);
};

const createErrorLog = errorMesage => logger.error(errorMesage);

const checkToken = async (req, res, next) => {
    if (req.path === '/authenticate') {next();}

    let token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(403).json({ status: false, message: 'Invalid token' });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({ status: false, message: 'No token provided' });
    }
};

const loginUser = async (login, password, DB) => {
    const user = await DB.findOne({ where: {login: login}, raw: true});

    if (!user || user.password !== password) {
        throw new Error(`User with login ${login} or password ${login} does not exist!`);
    } else {
        const payload = {
            sub: user.id,
            login: user.login
        };
        const token = jwt.sign(payload, 'secret', { expiresIn: 20 });
        return token;
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    deleteItem,
    createLog,
    createErrorLog,
    checkToken,
    loginUser
};

