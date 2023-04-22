const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
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
  response.json({ info: 'Node.js, Express, and Postgres API' })


})

app.get('/hotel', db.getHotel)
app.get('/hotel/:id', db.getHotelById)
app.post('/hotel', db.createHotel)
app.put('/hotel/:id', db.updateHotel) 
app.delete('/hotel/:id', db.deleteHotel)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})