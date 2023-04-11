
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        required:true,
        trim:true,
        type:String
    },
    email:{
        required:true,
        trim:true,
        lowercase:true,
        type:String,
        unique:true
    }
})

userSchema.statics.findCredentials = async( password , username ) =>{
    

   const user = await User.findOne({username})
    if(!user)
    {
        throw new error('unable to login')
    }
    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch)
    {
        throw new error('unable to login')
    }
}

const User = mongoose.model('user' , userSchema)
module.exports = User