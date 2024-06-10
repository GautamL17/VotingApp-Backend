const mongoose = require('mongoose')
async function connectMongoDb(url){
    try{
        await mongoose.connect(url);
        console.log('connected to mongodb')
    }
    catch(error){
        console.error('error connecting to mongodb',error);
    }
}
module.exports =  connectMongoDb 