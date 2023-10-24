let instance = null;
const path = require('path');
const fs = require('fs');


class ImagesController {

    static getInstance() {
        if (!instance) {
          return new ImagesController();
        }
        return instance;
      }

      async getImages(req, res){
        try{
            const directorioImagenes = path.join(__dirname, '../../images');
            const idReceta = req.params.id;
            const imagenPredeterminada = 'no-image.png';

            const pathImagen = path.join(directorioImagenes, idReceta+".jpg");

            fs.access(pathImagen, fs.constants.F_OK, (err) => {
            if (err) {
                // La imagen solicitada no existe, enviar la imagen predeterminada
                res.sendFile(path.join(directorioImagenes, imagenPredeterminada));
            } else {
                // La imagen solicitada existe, enviarla
                res.sendFile(pathImagen);
            }
        });
        }catch(err){
            console.log(err)
        }
      }
    

    // async getImages(req, res){
    //     try{
    //         const idReceta = req.params.id;
    //         const nombre = idReceta + '.jpg'
    //         const pathImage = path.join(__dirname, '../../images', nombre);
    //         console.log(pathImage)
    //         return res.sendFile(pathImage)
    //     } catch(err){
    //         console.log(err)
    //     }
    // }
}

module.exports = ImagesController.getInstance();