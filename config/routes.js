const homeController = require('../controllers/homeController');
const blogsController = require('../controllers/blogsController')
const authController = require('../controllers/authController')

module.exports = (app) => {
    app.use('/blogs', blogsController);
    app.use('/auth', authController)
    app.use('/', homeController);
    app.use((err, req, res, next) => {
        console.log('---', err.message);

        res.status(500).send('Something happened');
    });
};