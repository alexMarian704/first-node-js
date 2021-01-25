const express = require('express');
const Blog = require('../models/blog')
const Comment = require('../models/comments');

const router = express.Router();

//blogs page
router.get('/blogs',(req,res) =>{
    Blog.find().sort({  createdAt : 1})
        .then((result)=>{
            res.render('article' , {blogs: result});
        })
        .catch((err) =>{
            console.log(err);
        })

});

//create blog
router.post('/blogs/create' ,(req,res)=>{
    const blog = new Blog(req.body)

    blog.save()
        .then((result)=>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err);
        })
})

// create blog page
router.get('/blogs/create' , (req,res)=>{
    res.render('create');
})

//add
router.post('/blogs/comments' , (req,res) =>{
    const comment = new Comment(req.body)

    comment.save()
    .then((result) =>{
        res.redirect('/blogs/comments')
    })
    .catch((err)=>{
        console.log(err);
    })
})

//comments 
router.get('/blogs/comments' , (req,res) =>{
    Comment.find()
    .then((result)=>{
        res.render('comments' , {comments:result})
    })
    .catch((err)=>{
        console.log(err)
    })
})

//single blog page
router.get('/blogs/:id' , async (req,res)=>{
    const id = req.params.id;
    try{
    const blogValue = await Blog.findById(id)
    const commValue = await Comment.find()
    res.render('singleblog', {blog:blogValue , comment:commValue})
    } catch (err) {
        console.log(err);
    }
})

router.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect : '/blogs'})
        }).catch((err) => {
            console.log(err);
        });
})

module.exports = router;