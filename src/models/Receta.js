const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecetaSchema = new Schema({
    id:Number,
    nombre:String,
    tiempoPreparacion:String,
    ingredientes:[String],
    receta:String,
    sinGluten:Boolean
});

const User = mongoose.model('Receta', RecetaSchema);

module.exports = User;