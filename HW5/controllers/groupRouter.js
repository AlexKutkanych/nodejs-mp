import { Router } from 'express';
import sequelize from '../loaders/dbConfig';
import { getAllItems, getItemById, deleteItem, createLog } from '../services';

const groupRouter = Router();

groupRouter.get('/group', async (req, res) => {
    const Groups = req.app.get('Groups');
    const groups = await getAllItems(Groups);
    createLog('getAllItems', Groups);

    if (groups.length) {
        res.json(groups);
    } else {
        res.send(`No Groups in your DB!`);
    }
});

groupRouter.get('/group/:id', async (req, res) => {
    const groupId = req.params.id;
    const Groups = req.app.get('Groups');
    const currentData = await getItemById(Groups, groupId);
    createLog('getItemById', Groups, groupId);

    if (currentData) {
        const currentUser = currentData.dataValues;
        res.json(currentUser);
    } else {
        res.send(`Group with id ${groupId} does not exist!`);
    }
});

groupRouter.post('/group/create', async (req, res) => {
    const Groups = req.app.get('Groups');
    const Users = req.app.get('Users');
    try {
        const newGroup = await Groups.create({
            name: req.body.name,
            permission: req.body.permission
        });
    
        const user = await Users.findByPk(req.body.userId);
        await newGroup.addUser(user.dataValues.id);
        
        let usersGroups = await Users.findByPk(req.body.userId, {
            include: [{
                model: Groups,
                as: 'groups',
                attributes: ['id', 'name']
            }]
        });
        
        res.status(200).json(usersGroups);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});

groupRouter.post('/group/add-user', async (req, res) => {
    const Groups = req.app.get('Groups');
    const { groupId, userId } = req.body;

    try {
        const trans = await sequelize.transaction()
        const group = await Groups.findOne({ where: { id: groupId }}, {transaction: trans })
        const updateGroup = await group.update({ userIds: userId }, {transction: trans });

        if (updateGroup) {
            res.status(200).json(group);
            trans.commit();
        } else {
            trans.rollback()
        }
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});

groupRouter.put('/group/:id', async (req, res) => {
    const groupId = req.params.id;
    const Groups = req.app.get('Groups');
    const currentData = await getItemById(Groups, groupId);
    createLog('getItemById', Groups, groupId);

    if (currentData) {
        const currentGroup = currentData.dataValues;
        currentData.update(req.body);
        res.status(200).json(currentGroup);
    } else {
        res.send(`User with id ${userId} does not exist!`);
    }
});

groupRouter.delete('/group/:id', async (req, res) => {
    const groupId = req.params.id;
    const Groups = req.app.get('Groups');
    const currentData = await deleteItem(Groups, groupId);
    createLog('getItemById', Groups, groupId);

    if (currentData) {
        res.status(200).json(`Group with id ${groupId} has been deleted!`);
    } else {
        res.status(403).json(`No group with id ${groupId}!`);
    }
});

module.exports = groupRouter;

