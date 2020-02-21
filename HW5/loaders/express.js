import dbLoader from './dbLoader';
import router from '../controllers';

export default async ({ app }) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    const Users = await dbLoader().Users;
    const Groups = await dbLoader().Groups;
    const GroupUsers = await dbLoader().GroupUsers;

    app.set('Users', Users);
    app.set('Groups', Groups);
    app.set('GroupUsers', GroupUsers);
    router(app);

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!!');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    // app.use((err, req, res, next) => {
    //     /**
    //      * Handle 401 thrown by express-jwt library
    //      */
    //     if (err.name === 'UnauthorizedError') {
    //         return res
    //             .status(err.status)
    //             .send({ message: err.message })
    //             .end();
    //     }
    //     return next(err);
    // });
};