const Blog = require('../models/Blog')
const User = require('../models/User')

async function getAll(query) {
    const options = {}
    if (query.search) {
        options = { regex: query.search, $options: 'i' }
    }
    const blogs = await Blog.find(options).lean()

    return blogs
}


async function create(blog) {
    const record = new Blog(blog)

    await record.save()
    return record;
}


async function getById(id) {
    const blog = await Blog.findById(id).populate('owner').lean()

    if (blog) {
        const viewModel = {
            _id: blog._id,
            title: blog.title,
            imageUrl: blog.imageUrl,
            content: blog.content,
            category: blog.category,
            follow: blog.follow,
            owner: blog.owner,


        }



        return viewModel
    } else {
        return undefined;

    }
}


async function edit(id, blog) {

    const exsisting = await Blog.findById(id);

    if (!exsisting) {
        throw new ReferenceError('No such ID in database')
    }

    Object.assign(exsisting, blog);
    return exsisting.save();


}

function deleteBlog(blogId) {
    return Blog.deleteOne({ _id: blogId })
}





async function attachBlog(blogId, userId) {
    const blog = await Blog.findById(blogId);


    blog.follow.push(userId);
    await blog.save();
    return blog
}

async function getUserById(id) {
    return await User.findById(id).lean()
}


async function getAllBlogs(userId) {

    return await Blog.find({ "owner": `${userId}` }).lean();
}

async function getAllBlogsFoll(userId) {

    return await Blog.find({ "follow": `${userId}` }).lean();
}






module.exports = {
    getAll,
    create,
    getById,
    edit,
    deleteBlog,
    attachBlog,
    getUserById,
    getAllBlogs,
    getAllBlogsFoll

}