import Joi from '@hapi/joi';

const addUser = (users, userData) => {
    const lastId = users[users.length - 1].id;
    return Object.assign(userData, { id: lastId + 1, isDeleted: false });
};

const modifyUser = (user, fieldsToChange) => {
    for (const key in fieldsToChange) {
        if (fieldsToChange.hasOwnProperty(key)) {
            user[key] = fieldsToChange[key];
        }
    }
    return user;
};

const getAutoSuggestUsers = (loginSubstring, limit) => {
    limit.sort((a, b) => a.login - b.login);
    return limit.filter(user => user.login.indexOf(loginSubstring) > -1);
};

const deleteUserSoftly = (user) => Object.assign(user, { isDeleted: true });

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().integer().min(4).max(130).required(),
});

const createErrorMsg = error => error.details.map(item => item.message).join(' and ');

module.exports = {
    addUser,
    modifyUser,
    getAutoSuggestUsers,
    deleteUserSoftly,
    userSchema,
    createErrorMsg
};
