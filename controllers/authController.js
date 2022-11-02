const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
})

router.post('/register', async (req, res) => {

    try {

        await req.auth.register(req.body)
        res.redirect('/');
    } catch (err) {
        console.log(err.message, 'errrrr')
        const ctx = {
            title: 'Register',
            error: err.message,
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                repass: req.body.repass,
            }
        }
        res.render('register', ctx);
    }
});


router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

router.post('/login', async (req, res) => {
    try {

        await req.auth.login(req.body);
        res.redirect('/');
    } catch (err) {
        const ctx = {
            title: 'Login',
            error: err.message,
            data: {
                email: req.body.email,               
                password: req.body.password
            }
        };

        res.render('login', ctx);
    }
});

router.get('/profile', async(req, res) => {

    const user = req.user;

    const blogsCreated = await req.storage.getAllBlogs(user._id)
  

    const blogsFollews= await req.storage.getAllBlogsFoll(user._id)

    const ctx = {
        title: 'Profile',
        user,
        blogsCreated,
        blogsFollews
    }
    res.render('profile',ctx);
});





module.exports = router;
