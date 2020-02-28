import dbLoader from './dbLoader';
import router from '../controllers';
import { createErrorLog } from '../services';

export default async ({ app }) => {
    const Users = await dbLoader().Users;
    const Groups = await dbLoader().Groups;
    const GroupUsers = await dbLoader().GroupUsers;

    app.set('Users', Users);
    app.set('Groups', Groups);
    app.set('GroupUsers', GroupUsers);
    router(app);

    app.use((err, req, res, next) => {
        createErrorLog(err);
        next(err);
    });
};