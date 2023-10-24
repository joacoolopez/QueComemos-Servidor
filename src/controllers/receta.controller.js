let instance = null;
const RecetaService = require("../services/receta.service");

class RecetaController {

    static getInstance() {
        if (!instance) {
          return new RecetaController();
        }
        return instance;
      }

    async createReceta(req,res) {
        try {
            console.log(req.body)
            let newReceta = await RecetaService.createReceta(req.body);
            return res.status(201).json({
                message: "Created!",
                usuario: newReceta,
              });
        }catch (err){
            console.log('error')
        }
    }

    async getRecetas(req, res){
        try{
            const recetas = await RecetaService.getRecetas();
            return res.status(200).json(recetas);
        } catch(err){
            console.log("error")
        }
    }

    async getAleatorio(req, res){
        try{
            const recetasAleatorias = await RecetaService.getAleatorio();
            console.log(recetasAleatorias)
            return res.status(200).json(recetasAleatorias)
        }catch(err){
            console.log(err.message)
        }
    }

    async getReceta(req, res){
        try{
            const idReceta = req.params.id;
            const receta = await RecetaService.getReceta(idReceta);
            return res.status(200).json(receta);
        } catch(err){
            console.log("error")
        }
    }
}

module.exports = RecetaController.getInstance();