const express = require('express')
const Post = require('../models/posts')
const path = require('path')
const multer = require('multer')
const router = new express.Router()

router.delete('/post/:id' , async(req,res) =>{

    const _id = req.params.id
     await Post.findByIdAndDelete(_id)
    res.redirect('/posts')
})

router.get('/edit/:id' , async(req , res) =>{
    const _id = req.params.id
    const post = await Post.findById(_id)
    res.render('edit' , {post : post})
})



const EditStorage = multer.diskStorage({
    destination : './public/images/',
    filename: (req , file , cb)=>{
        cb(null,file.fieldname + '-' + Date.now()+
        path.extname(file.originalname))
    }
})

const EditUpload = multer({
    storage:EditStorage,
    limits: {
        fileSize:1000000
    },
    fileFilter: function(req , file , cb)
    {
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(extname && mimetype)
    {
        return cb(null , true)
    }
    else{
        return cb('error : image only')
    }
    },
})

router.put('/edit/:id' , EditUpload.single('image') ,async(req,res) =>{
    const _id = req.params.id
    const edited = {
        title : req.body.title,
        body : req.body.body,
        photo : req.file.filename
    }
    try{
        await Post.findByIdAndUpdate(_id, edited)
        res.redirect('/posts')
    }catch(e){
        console.log(e)
    }
})

router.get('/posts/:slug' , async(req,res) =>{
    const slug = req.params.slug
    const post = await Post.findOne({slug:slug})
    res.render('show' , {post : post})
})

const storage = multer.diskStorage({
    destination : './public/images/',
    filename: (req , file , cb)=>{
        cb(null,file.fieldname + '-' + Date.now()+
        path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    limits: {
        fileSize:1000000
    },
    fileFilter: function(req , file , cb)
    {
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(extname && mimetype)
    {
        return cb(null , true)
    }
    else{
        return cb('error : image only')
    }
    },
})


router.post('/postsCreate' , upload.single('image') , async(req , res) =>{

    const posts = new Post({
        title : req.body.title,
        body : req.body.body,
       photo : req.file.filename
    })

    try{
    const post = await posts.save()
     res.redirect(`posts/${post.slug}`)
    }catch (e){

        res.render('create')
    }
    console.log(posts)
    
})

module.exports = router