const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredienteSchema = new Schema({
    id: Number,
    nombre: String,
}, { _id: false });

const RecetaSchema = new Schema({
    id:Number,
    nombre:String,
    tiempoPreparacion:Number,
    ingredientes:[IngredienteSchema],
    receta:String,
    sinGluten:Boolean,
    puntuacion: Number
});

const User = mongoose.model('Receta', RecetaSchema);

module.exports = User;