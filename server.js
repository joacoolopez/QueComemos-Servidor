require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./src/db/config');
const cors = require('cors')


const app = express();
app.use(cors())
dbConnection();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde este origen
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Cabeceras permitidas
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/receta', require("./src/routes/receta.routes"))
app.use('/api/user', require("./src/routes/user.routes"))
app.use('/api/images', require("./src/routes/images.routes"))

app.get("/j", (req, res) => {
  res.status(200).send({ message: "You are connected to the project" });
});

app.listen(process.env.PORT, () =>{
    console.log('App listening on PORT: '+process.env.PORT);
})

module.exports = app;