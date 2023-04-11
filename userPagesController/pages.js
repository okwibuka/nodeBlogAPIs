
const express = require('express')
const router = new express.Router()

router.get('/home' , async(req, res) =>{
    res.render('loggedUser/index')
})

module.exports = router
