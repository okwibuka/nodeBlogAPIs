
require('./mongodb/mongodb')
const express = require('express') 
const Post = require('./models/posts')
const pagesController = require('./pagesController/pages') 
const postsController = require('./postsController/posts')
const usersController = require('./usersController/users')
const userPagesController = require('./userPagesController/pages')
const methodOverride = require('method-override')
const app = express()

const port = process.env.PORT || 1000

app.use(express.urlencoded({extended : false }))

app.use(express.static('./public'))

app.set('view engine' , 'ejs')
app.use(methodOverride('_method'))
app.use(pagesController)
app.use(postsController)
app.use(usersController)
app.use(userPagesController)


app.get('/posts' , async(req,res) =>{
    try{
        const posts = await Post.find().sort({createdAt : 'desc'})
        res.render('posts' , {posts , posts})

    }catch (e){

        res.send('no post found')
    }
})


app.listen(port , ()=>{
    console.log('port connected on' , port)
})