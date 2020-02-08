module.exports = app => {
    app.use(require('./userRouter'));
    app.use(require('./groupRouter'));
};

