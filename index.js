// npm i mysql express-myconnection

const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const app = express()

const routes = require('./routes')

const cors = require('cors')
app.use(cors())

app.set('port',process.env.PORT || 9000)

const dbOptions = {
    host : 'mysql-regresandoanimales.alwaysdata.net',
    // port:'3306',
    user:'218654_jeanpierr',
    password:'Dead_Gun15',
    database:'regresandoanimales_llevelo'
    
}

// middlewares running ------------------------------------

app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())

// server running ------------------------------------

app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto',app.get('port'))
})

// server routing ------------------------------------

app.use('/api',routes)

app.get('/',(req,res)=>{
    res.send('Iniciando mi API REST')
})
