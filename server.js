require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./src/db/config');


const app = express();
dbConnection();


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