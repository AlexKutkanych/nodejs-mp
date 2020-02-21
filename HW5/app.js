import express from 'express';
import morgan from './logger/morgan';
import logger from './logger';

const port = process.env.PORT || 3000;

async function startServer() {
    const app = express();

    await require('./loaders').default({ app });

    app.use(morgan);

    app.listen(port, () => logger.info(`Server is my running at ${port}`));
}

startServer();
