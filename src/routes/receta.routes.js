const { Router } = require("express");

const RecetaController = require("../controllers/receta.controller");
const validateJwt = require("../middlewares/jwtValidator")

const router = Router();

router.post('/postReceta', RecetaController.createReceta)

router.get('/all',validateJwt, RecetaController.getRecetas)

router.get('/aleatorio',validateJwt, RecetaController.getAleatorio)

router.get('/unique/:id', validateJwt, RecetaController.getReceta)

module.exports = router;