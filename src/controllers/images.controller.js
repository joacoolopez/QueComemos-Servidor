let instance = null;
const path = require('path');


class ImagesController {

    static getInstance() {
        if (!instance) {
          return new ImagesController();
        }
        return instance;
      }

    async getImages(req, res){
        try{
            const idReceta = req.params.id;
            const nombre = idReceta + '.jpg'
            const pathImage = path.join(__dirname, '../../images', nombre);
            console.log(pathImage)
            return res.sendFile(pathImage)
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = ImagesController.getInstance();