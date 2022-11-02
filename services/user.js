const User = require('../models/User')

async function createUser(username,email, hashedPassword) {

    const user = new User({
        username,
        email,      
        hashedPassword
    })

  

    await user.save();
    return user;
}


async function getUserByUsername(username) {
    return await User.findOne({ "username":`${username}` });
   
}



async function getUserByEmail(email) {
    return await User.findOne({ "email":`${email}` });
   
}



async function getUserById(id){
    return await User.findById(id).lean()
}




module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById

}