

function isOwner() {
    return (req, res, next) => {
        if (req.data.blog && req.user && (req.data.blog.owner._id == req.user._id)) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}
module.exports = {

    isOwner
}