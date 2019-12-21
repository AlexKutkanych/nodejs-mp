import express from 'express';
import storage from 'node-persist';
import { addUser, modifyUser, userSchema, createErrorMsg } from '../utils';
import persistUsers from '../persistance';

const usersPromise = persistUsers();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/user/create', async (req, res) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        var joinedErrors = createErrorMsg(error);
        res.status(400).send(joinedErrors);
        return;
    }

    const users = await usersPromise;

    const newUser = addUser(users, req.body);
    users.push(newUser);
    storage.setItem('users', users);
    res.status(200).json(newUser);
});

app.put('/user/:id', async (req, res) => {
    const fieldsToChange = req.body;
    const { error } = userSchema.validate(fieldsToChange, { abortEarly: false });

    if (error) {
        var joinedErrors = createErrorMsg(error);
        res.status(400).send(joinedErrors);
        return;
    }

    const users = await usersPromise;
    const userId = req.params.id;
    
    const modifiedUser = modifyUser(users[userId], fieldsToChange);
    users[userId] = modifiedUser;
    storage.setItem('users', users);
    res.status(200).json(modifiedUser);
});

app.listen(port, () => console.log(`Server is my running at ${port}`));
