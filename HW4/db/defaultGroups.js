module.exports = [
    {
        name: 'Admin',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        name: 'GroupOwner',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        name: 'GroupCreator',
        permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        name: 'User',
        permission: ['READ', 'WRITE', 'SHARE']
    },
    {
        name: 'Guest',
        permission: ['READ', 'SHARE']
    },
];
