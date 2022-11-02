const { Router } = require('express');
const { isOwner } = require('../middlewares/guard');
const { preloadBlog } = require('../middlewares/preload');
const userService = require('../services/user')

const router = Router();


router.get('/', async (req, res) => {
    const blogs = await req.storage.getAll(req.query);

    const lastTreeBlogs = blogs.reverse().slice(0, 3)

    const ctx = {
        title: 'Blog',
        blogs,
        lastTreeBlogs
    };
    res.render('home', ctx);
});


router.get('/create', async (req, res) => {

    res.render('create', { title: 'Create Blog' })
})

router.post('/create', async (req, res) => {

    const blog = {

        title: req.body.title,
        imageUrl: req.body.imageUrl,
        content: req.body.content,
        category: req.body.category,
        owner: req.user._id

    }

    try {
        await req.storage.create(blog)
        res.redirect('/blogs/catalog')
    } catch (err) {
        let arr = err.message.split(', ')
        console.log(arr)
        const ctx = {
            title: 'Create Blog',
            error: arr,
            blog
        }
        res.render('create', ctx)
    }
})


router.get('/catalog', async (req, res) => {

    const blogs = await req.storage.getAll(req.query)
    const ctx = {
        title: 'Blogs',
        blogs
    }
    res.render('catalog', ctx)

})


router.get('/details/:id', preloadBlog(), async (req, res) => {

    const blog = req.data.blog;
    const ownerBlog = await userService.getUserById(blog.owner)
    const emailOwner = ownerBlog.email
    let hasFallow;
    let isUser;
    let isOwner;
    let arr;
    let userFollows;
    let allUsersFollows;
    if (blog == undefined) {
        res.redirect('/404')
    } else {


        blog.emailOwner = blog.owner._id.email
        isOwner = req.user && (blog.owner._id == req.user._id);
        hasFallow = req.user && blog.follow.find(u => u._id == req.user._id);
        isUser = req.user && (blog.owner._id != req.user._id);

        arr = blog.follow;

        userFollows = await Promise.all(
            arr.map(async (element) => {

                let a = req.storage.getUserById(element)

                return a;
            })
        )


        allUsersFollows = userFollows.map((x) => { return x.email }).join(', ')
    }

    const ctx = {
        title: 'Details Page',
        blog,
        emailOwner,
        hasFallow,
        isUser,
        isOwner,
        allUsersFollows


    }
    res.render('details', ctx)


})


router.get('/edit/:id', preloadBlog(), isOwner(), async (req, res) => {
    const blog = req.data.blog;
    if (!blog) {
        res.redirect('/404');
    } else {
        const ctx = {
            title: 'Edit Blog',
            blog
        };
        res.render('edit', ctx);
    }
})


router.post('/edit/:id', preloadBlog(), isOwner(), async (req, res) => {
    const blog = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        content: req.body.content,
        categoty: req.body.categoty,
        owner: req.user._id
    };
    try {
        await req.storage.edit(req.params.id, blog);
        let id = req.params.id
        res.redirect(`/blogs/details/${id}`);
    } catch (err) {
        console.log(err.message)
        res.redirect('/404');
    }
});


router.get('/delete/:id', preloadBlog(), isOwner(), async (req, res) => {
    const blog = req.data.blog;
    if (!blog) {
        res.redirect('/404');
    } else {

        await req.storage.deleteBlog(req.params.id)
        res.redirect('/blogs/catalog')
    }

})


router.get('/follow/:id', preloadBlog(), async (req, res) => {


    try {
        const blog = req.data.blog;


        await req.storage.attachBlog(req.params.id, req.user._id);
        res.redirect('/blogs/details/' + req.params.id);
    } catch (err) {
        console.log(err.message);
        res.redirect('/blogs/details/' + req.params.id);
    }
});
module.exports = router;
