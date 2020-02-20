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

groupUserRouter.post('/user/create', async (req, res) => {
    const Users = req.app.get('Users');
    const newUser = await createItem(Users, req.body);
    createLog('createItem', Users, req.body);

    res.status(200).json(newUser);
});

userRouter.put('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = req.app.get('Users');
    const currentData = await getItemById(Users, userId);
    createLog('getItemById', Users, userId);

    if (currentData) {
        const currentUser = currentData.dataValues;
        currentData.update(req.body);
        res.status(200).json(currentUser);
    } else {
        res.send(`User with id ${userId} does not exist!`);
    }
});

userRouter.delete('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = req.app.get('Users');
    const currentData = await deleteItem(Users, userId);
    createLog('deleteItem', Users, userId);

    if (currentData) {
        res.status(200).json(`User with id ${userId} has been deleted!`);
    } else {
        res.status(403).json(`No user with id ${userId}!`);
    }
});

module.exports = groupUserRouter;

