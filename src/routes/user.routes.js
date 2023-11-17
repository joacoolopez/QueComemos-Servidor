const { Router } = require("express");

const UserController = require("../controllers/user.controller");
const userController = require("../controllers/user.controller");

const router = Router();

router.post('/create', UserController.createUser)

router.post('/login', UserController.login)

router.get('/getRecetasGuardadas', userController.getRecetasGuardadas)

router.post('/postRecetasGuardadas', userController.postRecetasGuardadas)

router.put('/change', userController.changeUser)

module.exports = router;