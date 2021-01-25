const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const router = require('./routes/routes')

const app = express();
const port = 5000;

//mongo db
const db = "";
mongoose.connect(db , {useNewUrlParser:true , useUnifiedTopology: true })
 .then((result) => app.listen(port) , console.log("connect"))
 .catch((err) => console.log(err))


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
let urlencodedBody = bodyParser.urlencoded({extended:false}) 

//first page
app.get('/',(req,res)=>{
    let title = "index"
    let name = "marian"
    res.render('index' , {title , name});
})

app.use(router);

//404 page
app.use((req,res) => {
    res.status(404).render('404');
})