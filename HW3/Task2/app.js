import express from 'express';
import dbLoader from './loaders/index';

const port = process.env.PORT || 3000;

async function startServer() {
    const app = express();

    const Users = await dbLoader();

    app.set('Users', Users);
    app.use('/', await require('./controllers'));

    app.listen(port, () => console.log(`Server is my running at ${port}`));
}

startServer();
