const { Router } = require("express");

const ImagesController = require("../controllers/images.controller");
const validateJwt = require("../middlewares/jwtValidator")

const router = Router();

router.get('/:id',validateJwt ,ImagesController.getImages)

module.exports = router;