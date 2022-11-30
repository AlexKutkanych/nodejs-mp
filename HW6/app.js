import express from 'express';
import cors from 'cors';
import { morganLogger } from './logger/';
import { logger } from './logger';

const port = process.env.PORT || 3000;

async function startServer() {
    const app = express();
    app.use(cors());
    await require('./loaders').default({ app });
    app.use(morganLogger);

    app.listen(port, () => logger.info(`Server is my running at ${port}`));
}

startServer();
