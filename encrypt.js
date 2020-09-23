const express = require('express')
const path = require('path')
const JsEncrypt = require('node-jsencrypt')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
//const Cryptr=require('cryptr')
const app = express()
const encrypt = new JsEncrypt()
//const cryptr = new Cryptr('ridwan')
const routers = require("./routes/routeHandler.js")
var port = process.env.PORT || 3001


app.use(bodyParser.urlencoded({extended: false})) //reads what you post(url encoded data)
app.use(bodyParser.json())


app.set('views',path.join(__dirname, "/views/"))
app.engine('hbs',exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, "style")))

app.use('/', routers)



app.listen(port,()=>{
    console.log("server is up and running on port 3001")
})

