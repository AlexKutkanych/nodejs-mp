import express from 'express';
import storage from 'node-persist';
import { addUser, modifyUser, getAutoSuggestUsers, deleteUserSoftly } from '../utils';
import persistUsers from '../persistance';

const app = express();
const port = process.env.PORT || 3000;


const usersPromise = persistUsers();

app.get('/user/:id', async (req, res) => {
    const users = await usersPromise;
    const userId = req.params.id;
    const currentUser = await users.find(({ id }) => id === Number(userId));

    if (currentUser) {
        res.json(currentUser);
    } else {
        res.send(`User with id ${userId} does not exist!`);
    }
});

app.use(express.urlencoded({ extended: true }));

app.post('/user/create', async (req, res) => {
    const users = await usersPromise;
    const newUser = addUser(users, req.body);
    users.push(newUser);
    storage.setItem('users', users);
    res.status(200).json(newUser);
});

app.put('/user/:id', async (req, res) => {
    const users = await usersPromise;
    const userId = req.params.id;
    const fieldsToChange = req.body;
    const modifiedUser = modifyUser(users[userId], fieldsToChange);
    users[userId] = modifiedUser;
    storage.setItem('users', users);
    res.status(200).json(modifiedUser);
});

app.get('/suggest-user/:suggest', async (req, res) => {
    const suggestString = req.params.suggest;
    const users = await usersPromise;
    const result = getAutoSuggestUsers(suggestString, users);

    if (result.length) {
        res.status(200).json(result);
    } else {
        res.status(204).end();
    }
});

app.delete('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const users = await usersPromise;
    const modifiedUser = deleteUserSoftly(users[userId]);
    users[userId] = modifiedUser;
    storage.setItem('users', users);
    res.status(200).json(modifiedUser);
});

app.listen(port, () => console.log(`Server is my running at ${port}`));
