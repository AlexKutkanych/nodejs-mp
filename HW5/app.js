import express from 'express';
import dbLoader from './loaders/index';
import router from './controllers/index';
import morgan from './logger/morgan';
import logger from './logger';

const port = process.env.PORT || 3000;

async function startServer() {
    const app = express();

    app.use(morgan);

    const Users = await dbLoader().Users;
    const Groups = await dbLoader().Groups;
    const GroupUsers = await dbLoader().GroupUsers;

    app.set('Users', Users);
    app.set('Groups', Groups);
    app.set('GroupUsers', GroupUsers);
    router(app);

    app.listen(port, () => logger.info(`Server is my running at ${port}`));
}

startServer();
