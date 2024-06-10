const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    aadharCardNumber:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter',
    },
    isVoted:{
        type:Boolean,
        default:false ,
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    
    const user = this 
    
    if(!user.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password,salt)
        user.password = hashedPassword
        next()
    } catch (error) {
        return next(error);
    }

})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }catch(e){
        console.log(e);
    }
}
const User = mongoose.model('User',userSchema)
module.exports = User