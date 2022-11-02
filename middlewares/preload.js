function preloadBlog() {
    return async (req, res, next) => {
        req.data = req.data || {};

        try {
            const blog = await req.storage.getById(req.params.id);

            if (blog) {
                req.data.blog = blog
            }

        } catch (err) {
            console.error('Database error:', err.message);

        }

        next()
    }
}


module.exports = {
    preloadBlog
}