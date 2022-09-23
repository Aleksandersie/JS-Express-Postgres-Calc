
const express = require('express');
const app = express();
require('dotenv').config()
//const router = require('./router/apiRouter');
const router = require ('./router/indexRouter')
const sequelize = require('./sequelize/sequelize');





app.use('/',express.static('./public'));
app.use(express.json());
app.use('/api',router)


const start=async()=>{
   await sequelize.authenticate()
   await sequelize.sync()
}

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening`)
})

start()