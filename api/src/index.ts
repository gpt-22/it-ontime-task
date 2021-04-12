// modules
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { routes } = require('./routes')

require('dotenv').config({
  path: path.resolve(__dirname, '../.env.local')
})

// .env.local constants
const PORT = process.env.PORT || 3000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req: any, res: any, next: any) {
  const origins = [
    'http://localhost:8080',
  ];

  for(let i = 0; i < origins.length; i++){
    let origin = origins[i];

    if(req.headers.origin.indexOf(origin) > -1){
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
routes.forEach((route: string): void => {
  app.use(`/api/${route}`, require(`./routes/${route}`))
})


const uri: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.e4anz.mongodb.net/itontime-task`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then((): void => {
  app.listen(PORT, (): void => {
    console.log(`Started at http://localhost:${PORT}`)
  })
})
