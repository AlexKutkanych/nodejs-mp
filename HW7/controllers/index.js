import { checkToken } from '../services';

module.exports = app => {
    app.use(checkToken);
    app.use(require('./userRouter'));
    app.use(require('./groupRouter'));
};

