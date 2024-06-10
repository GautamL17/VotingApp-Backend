require('dotenv').config()
const express = require('express')
const app = express()
// require('dotenv').config()
const connectMongoDb = require('./utils/connection')
const URL = process.env.DB_URL 
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const candidateRoutes = require('./routes/candidate.routes')
const { jwtAuthenticate } = require('./utils/jwtAuth')
app.use(bodyParser.json())
const PORT =  3000


app.use('/user',userRoutes)
app.use('/candidate',candidateRoutes)
app.get('/',(req,res)=>(
    res.json({data:'hello'})
))


connectMongoDb(URL)


app.get('/',(req,res)=>{
    res.end('hello')
})
app.listen(PORT,()=>(console.log(`Listening on port ${PORT}`)))