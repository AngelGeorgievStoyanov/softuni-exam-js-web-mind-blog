const blogsService = require('../services/blogs')

async function init(){
    return(req,res,next)=>{
        const storage=Object.assign({},blogsService)
        req.storage=storage;
        next()
    }
}

module.exports=init;