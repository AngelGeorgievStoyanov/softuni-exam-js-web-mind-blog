const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: [true,'Username is required' ], minlength: [2, 'Username must be min length 2 char'], match: [/[a-zA-Z0-9]/, 'First name must contains only English letters and digits'] },
    email: { type: String, required: [true , 'Email is required'], minlength: [10, 'Email must be min length 10 char'], match: [/[a-zA-Z0-9]/, 'Email must contains only English letters and digits'] },
    hashedPassword: { type: String, required: true, minlength: [4, 'Password must be min 4 characters long'], match: [/[a-zA-Z0-9]/, 'Password must contains only English letters and digits'] },
})
module.exports = model('User', schema)