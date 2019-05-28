mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   
    post: {
        title: String,
        body: String,
        author: {
            firstName: String,
            lastName: String,   
        }
    }
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;