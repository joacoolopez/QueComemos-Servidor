const recetaModel = require('../models/Receta');

class RecetaService {
    async createReceta(receta){
        try{
            await recetaModel.create(receta);
            return receta;
        }catch(err){
            console.log('Error in createReceta service')
        }
    }

    async getRecetas(){
        try{
            const recetas = await recetaModel.find()
            return recetas;
        } catch(err){
            throw new error ("Error in getRecetas service")
        }
    }

    async getAleatorio(){
        try{
            const cantidadAleatorias = 3
            const recetasAleatorias = await recetaModel.aggregate([ { $sample: { size: cantidadAleatorias } } ])
            return recetasAleatorias;
        } catch(err){
            throw new error ("Error in getAleatorio service")
        }
    }

    async getReceta(id){
        try{
            const receta = await recetaModel.find({ id: id })
            return receta;
        } catch(err){
            throw new error ("Error in getRecetas service")
        }
    }
}

module.exports = new RecetaService();