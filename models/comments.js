const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    body: {
        type:String,
        required:true
    }
} , {timestamps:true})

const Comment = mongoose.model("Comment" , commentsSchema);

module.exports = Comment;