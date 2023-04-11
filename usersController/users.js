
const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const router = new express.Router()

router.post('/register' , async(req , res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password , 8)
    let users = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword
    })
    try{
     users = await users.save()
    res.render('register' , {users : users})
    }
    catch (e)
    {
        res.render('register')
    }
})

router.post('/home' , async(req , res) =>{

    try{
        await User.findCredentials(req.body.password , req.body.username)
        res.render('loggedUser/index' , {name : req.body.username})
    }
    catch (e)
    {
        res.render('login')
    }
})

module.exports = router