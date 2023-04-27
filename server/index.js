const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors') 

const db = require('./config/db') 
const routers =require('./routers')


const app = express();
const PORT = process.env.port || 5000

app.use(bodyParser.json({limit : '30mb'}))
app.use(bodyParser.urlencoded({extended:true, limit: '30mb'}))

app.use(cors())


db.connect()


routers(app)

app.listen(PORT,()=>{
    console.log(`SERVER is running  on port ${PORT}`);
})