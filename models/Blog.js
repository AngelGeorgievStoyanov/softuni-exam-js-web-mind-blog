const { Schema, model } = require('mongoose');


const schema = new Schema({
    title: { type: String, required: [true, 'Title is required'], minlength: [5, 'Title must be min 5 characters long'], maxlenght:[50,'Title must be max 50 characters long'] },
    imageUrl: { type: String, required: true, match: [/^https?/, 'Image must be a valid URL'] },
    content: { type: String, required: [true, 'Content is required'], minlength: [10, 'Content must be min 10 characters long'] },
    category: { type: String, required: [true, 'Category is required'], minlength: [3, 'Category must be min 3 characters long'] },
    follow: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },

})


module.exports = model('Blog', schema)