
const mongoose = require('mongoose')
const slugify = require('slugify')

postsSchema = new mongoose.Schema({

    title:{
        required:true,
        trim:true,
        type:String
    },
    body:{
        required:true,
        type:String,
        trim:true
    },
    photo:{

        type:Buffer
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    slug:{
        type:String,
        unique:true,
        required:true
    }
})

postsSchema.pre('validate' , function(next){
    if(this.title){
        this.slug = slugify(this.title , {lower:true , strict : true})
    }
    next()
})

module.exports = mongoose.model('post' , postsSchema)