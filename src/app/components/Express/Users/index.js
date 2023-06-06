const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const db = require('./queries')
const port = 3003;
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json({ info: 'Node.js, Express, and Postgres API for users' })


})


app.get('/user', db.getUser)
app.get('/useriid', db.getCpechUserById)
app.put('/useriid/:id', db.putUser) 
app.get('/user/:id', db.getUserById)
app.post('/user', db.createUser)
app.put('/user/:id', db.updateUser) 
app.delete('/user/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

