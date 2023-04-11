
const express = require('express')
const router = new express.Router()

router.get('/services', async(req,res) =>{
    res.render('services')
})

router.get('/about', async(req,res) =>{
    res.render('about')
})
router.get('/create', async(req,res) =>{
    res.render('create')
})

router.get('/', async(req,res) =>{
    res.render('index')
})

router.get('/register', async(req,res) =>{
    res.render('register')
})

router.get('/login', async(req,res) =>{
    res.render('login')
})





module.exports = router