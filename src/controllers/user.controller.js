let instance = null;
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const authService = require("../services/auth.service");

class UserController {

    static getInstance() {
        if (!instance) {
          return new UserController();
        }
        return instance;
      }

    async createUser(req,res) {
        try {
            let newUser = await userService.createUser(req.body);
            return res.status(201).json({
                estado: newUser,
              });
        }catch (err){
            console.log('Error, usuario ya existente')
            return res.status(500).json({
                method: "createUsuario",
                message: err.message,
              });
        }
    }


    async login(req, res){
        try{
            const { email, password } = req.body;
            let isUserRegistered = await authService.hasValidCredentials(email, password);

            if (isUserRegistered){
                const user = await userService.getUserByMail(email);
                

                const token = jwt.sign({id: user._id}, process.env.PRIVATE_KEY, {
                expiresIn: "1d",
                });

                return res.status(200).json({
                status: 200,
                id: user._id.toString(),
                name: user.name,
                lastname: user.lastname,
                token,
                estado: true,
                message: "Token created successfully.",
                });
            } else {
                return res.status(200).json({
                estado: false,  
                message: "Unauthorized.",
                });
              }
            } catch (err) {
              console.error(err);
              return res.status(500).json({
                method: "login",
                message: err.message,
              });
            }
        }

    async getCountUsers(req, res){
        try{
            const count = await userService.getCountUser();
            console.log(count)
            return res.status(200).json({
                estadoCountUser: count
            });
        }catch(err){
            return res.status(200).json(err);
        }
        
    }

    async getRecetasGuardadas(req, res){
      try{
        const {id} = req.body;
        let recetas = await userService.getRecetasGuardadas(id)
        console.log(recetas)
        return res.status(200).json({
          recetas: recetas
      });
      }catch(err){
            return res.status(200).json(err);
        }
    }

    async postRecetasGuardadas(req, res){
      try{
        const {id, receta} = req.body;
        let newReceta = await userService.postRecetasGuardadas(id, receta)
        console.log(newReceta)
        return res.status(200).json({
          newReceta: newReceta
      });
      }catch(err){
            return res.status(200).json(err);
        }
    }

    async changeUser(req, res){
      try{
        const {id, name, lastname, email} = req.body;
        let changeUser = await userService.changeUser(id, name, lastname, email)
        return res.status(200).json({
          name,
          lastname,
          email
      });
      }catch(err){
        console.log(err)
            return res.status(200).json(err);
        }
    } 

    }


module.exports = UserController.getInstance();