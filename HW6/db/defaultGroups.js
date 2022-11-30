module.exports = [
    {
        name: 'Admin',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        userIds: []
    },
    {
        name: 'GroupOwner',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        userIds: []
    },
    {
        name: 'GroupCreator',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        userIds: []
    },
    {
        name: 'User',
        permission: ['READ', 'WRITE', 'SHARE'],
        userIds: []
    },
    {
        name: 'Guest',
        permission: ['READ', 'SHARE'],
        userIds: []
    },
];
