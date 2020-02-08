import express, { Router } from 'express';
import { getItemById, createItem, deleteItem } from '../services';

const userRouter = Router();

userRouter.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = req.app.get('Users');
    const currentData = await getItemById(Users, userId);

    if (currentData) {
        const currentUser = currentData.dataValues;
        res.json(currentUser);
    } else {
        res.send(`User with id ${userId} does not exist!`);
    }
});

userRouter.use(express.urlencoded({ extended: true }));

userRouter.post('/user/create', async (req, res) => {
    const Users = req.app.get('Users');
    const Groups = req.app.get('Groups');
    // const newUser = await createItem(Users, req.body);
    let newUser = await Users.create(req.body, {
      include: [{
          model: Groups,
          as: 'groups'
        }]
    });

    res.status(200).json(newUser);
});

userRouter.put('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = req.app.get('Users');
    const currentData = await getItemById(Users, userId);

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

    if (currentData) {
        res.status(200).json(`User with id ${userId} has been deleted!`);
    } else {
        res.status(403).json(`No user with id ${userId}!`);
    }
});

module.exports = userRouter;

