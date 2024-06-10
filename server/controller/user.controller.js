const User = require('../models/user.models.js')
const { jwtGenerate } = require('../utils/jwtAuth.js')
const bcrypt = require('bcrypt')
const comparePassword = require('../models/user.models.js')
const HandleSignUp = async(req,res,next) =>{
    try{
        const data = req.body
        const adminUser = await User.findOne({ role: 'admin' });
        console.log(adminUser);
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }
        const user = new User(data)
        const response = await user.save()
        console.log('data saved')
        const payload = {
            id:response.id,
        }
        console.log(JSON.stringify(payload))
        const token = jwtGenerate(payload)
        res.status(200).json({response:response,token:token})
        
    }
    catch(e){
        
        console.log(e)
        res.status(500).json({ response:'Internal server error' })
    }
    finally{
        next()
    }
}   

const HandleLogin = async(req,res,next) => {
    try {
        const {aadharCardNumber , password } = req.body 
        const user = await User.findOne({aadharCardNumber})
        const isPasswordCorrect = await comparePassword(password)
        if(!user || !(isPasswordCorrect)){
            return res.status(401).json({error:'invalid username or password '})
        }
        const payload = {
            id : user.id,
        }
        const token = jwtGenerate(payload)
        res.json({token})
        
    } catch (error) {
        console.log(error);
    }finally{
        next()
    }
}

const HandleProfile = async(req,res,next) => {
    try {
        const userData = req.user 
        console.log('userData:',userData)
        const userId = userData.id
        const user = await User.findById(userId)
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }finally{
        next()
    }
}

const HandlePasswordChange = async(req,res,next) => {
    try {
        const userId = req.user.id
        const {currentPassword , newPassword} = req.body 
        const user = await User.findById(userId)
        const isPasswordCorrect = await comparePassword(currentPassword)
        if(!user || !isPasswordCorrect ){
            res.status(401).json('invalid username or password')
        }

        user.password = newPassword
        await user.save()
        res.status(200).json({message:'password updated'})
    } catch (error) {
        console.log(error);
    }finally{
        next()
    }
}


module.exports = {
    HandleSignUp,
    HandleLogin,
    HandleProfile,
    HandlePasswordChange,
}