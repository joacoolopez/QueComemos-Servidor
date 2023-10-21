const { Router } = require("express");

const RecetaController = require("../controllers/receta.controller");
const validateJwt = require("../middlewares/jwtValidator")

const router = Router();

router.post('/postReceta',validateJwt ,RecetaController.createReceta)

router.get('/recetas', validateJwt,RecetaController.getRecetas)

router.get('/aleatorio',validateJwt, RecetaController.getAleatorio)
module.exports = router;