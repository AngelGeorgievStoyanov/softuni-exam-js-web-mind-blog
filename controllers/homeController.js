const router = require('express').Router();
const asyncWrapper = require('../util/asyncWrapper');


router.get('/', (req, res) => res.redirect('/blogs')); 




router.get('*', (req, res) => {

    res.render('404')
}
);

module.exports = router;