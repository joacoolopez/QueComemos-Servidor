const { Router } = require("express");

const UserController = require("../controllers/user.controller");
const userController = require("../controllers/user.controller");
const validateJwt = require("../middlewares/jwtValidator")

const router = Router();

router.post('/create', UserController.createUser)

router.post('/login', UserController.login)

router.get('/getRecetasGuardadas/:id', validateJwt, userController.getRecetasGuardadas)

router.post('/postRecetasGuardadas', validateJwt, userController.postRecetasGuardadas)

router.put('/change', validateJwt, userController.changeUser)

module.exports = router;