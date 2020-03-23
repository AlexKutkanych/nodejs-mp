import express, { Router } from 'express';
import { getUserById, createUser, deleteUser } from '../services';

const router = Router();

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = req.app.get('Users');
    const currentData = await getUserById(Users, userId);

    if (currentData) {
        const currentUser = currentData.dataValues;
        res.json(currentUser);
    } else {
        res.send(`User with id ${userId} does not exist!`);
    }
});

router.use(express.urlencoded({ extended: true }));

router.post('/user/create', async (req, res) => {
    const Users = req.app.get('Users');
    const newUser = await createUser(Users, req.body);

    res.status(200).json(newUser);
});

router.put('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = req.app.get('Users');
    const currentData = await getUserById(Users, userId);

    if (currentData) {
        const currentUser = currentData.dataValues;
        currentData.update(req.body);
        res.status(200).json(currentUser);
    } else {
        res.send(`User with id ${userId} does not exist!`);
    }
});

router.delete('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = req.app.get('Users');
    const currentData = await deleteUser(Users, userId);

    if (currentData) {
        res.status(200).json(`User with id ${userId} has been deleted!`);
    } else {
        res.status(403).json(`No user with id ${userId}!`);
    }
});

module.exports = router;

