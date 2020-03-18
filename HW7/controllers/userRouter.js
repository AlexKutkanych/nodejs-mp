import express, { Router } from 'express';
import { getItemById, deleteItem, createLog, loginUser } from '../services';

const userRouter = Router();

userRouter.get('/user/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const Users = req.app.get('Users');
        const currentData = await getItemById(Users, userId);
        createLog('getItemById', Users, userId);
    
        if (currentData) {
            const currentUser = currentData.dataValues;
            res.json(currentUser);
        } else {
            throw new Error(`User with id ${userId} does not exist! | ${req.method} ${req.originalUrl} | data: ${JSON.stringify(req.params)}`);
        }
    } catch(error) {
        next(error);
        return res.sendStatus(500);
    }
});

userRouter.use(express.urlencoded({ extended: true }));

userRouter.post('/user/create', async (req, res) => {
    const Users = req.app.get('Users');
    const Groups = req.app.get('Groups');
    let newUser = await Users.create(req.body, {
      include: [{
          model: Groups,
          as: 'groups'
        }]
    });

    res.status(200).json(newUser);
});

userRouter.put('/user/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const Users = req.app.get('Users');
        const currentData = await getItemById(Users, userId);
        createLog('getItemById', Users, userId);
    
        if (currentData) {
            const currentUser = currentData.dataValues;
            currentData.update(req.body);
            res.status(200).json(currentUser);
        } else {
            throw new Error(`User with id ${userId} does not exist! | ${req.method} ${req.originalUrl} | data: ${JSON.stringify(req.params)}`);
        }
    } catch(error){
        next(error);
        return res.sendStatus(500);
    }
});

userRouter.delete('/user/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const Users = req.app.get('Users');
        const currentData = await deleteItem(Users, userId);
        createLog('deleteItem', Users, userId);
    
        if (currentData) {
            res.status(200).json(`User with id ${userId} has been deleted!`);
        } else {
            throw new Error(`User with id ${userId} does not exist! | ${req.method} ${req.originalUrl} | data: ${JSON.stringify(req.params)}`);
        }
    } catch (error) {
        next(error);
        return res.sendStatus(500);
    }
    
});

userRouter.post('/authenticate', async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const Users = req.app.get('Users');

        const token = await loginUser(login, password, Users);

        if (token) {
            res.json(token);
        } else {
            res.status(403).json({ status: false, message: 'No such user' });
        }

    } catch (error) {
        next(error);
        return res.sendStatus(500);
    }
});

module.exports = userRouter;

