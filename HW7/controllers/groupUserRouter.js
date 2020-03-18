import { Router } from 'express';
import { getAllItems, createLog } from '../services';

const groupUserRouter = Router();

groupUserRouter.get('/groupUser', async (req, res) => {
    const GroupUsers = req.app.get('GroupUsers');
    const currentData = await getAllItems(GroupUsers);
    createLog('getAllItems', GroupUsers);

    if (currentData) {
        res.json(currentData);
    } else {
        res.send(`User with id ${userId} does not exist!`);
    }
});

module.exports = groupUserRouter;

