const userModel = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
    async createUser(user){
        try{
            let isRegistred = await userModel.findOne({email:user.email})
            console.log(isRegistred)
            if (isRegistred){
                throw new Error("User already registred")
            }else{
                user.password = bcrypt.hashSync(user.password, process.env.SALT)
                await userModel.create(user);
                return true;
                }
                }catch(err){
            console.log(err)
            throw new Error("Error in createUser Service");
        }
    }

    async getUsers(){
        try{
            const users = await userModel.find()
            return users;
        } catch(err){
            throw new error ("Error in getUsers service")
        }
    }

    async getUserByMail(email){
        try{
            const user = await userModel.findOne({email:email});
            return user;
        }catch(err){
            throw new error ("Error in getUserByMail service")
        }
    }

    async getCountUser(){
        try{
            const count = await userModel.countDocuments();
            if (count>0){
                return true;
            }else{
                return false;
            }
            
        }catch(err){
            throw new error ("Error in getCountUser service")
        }
    }
    
    async getRecetasGuardadas(id){
        try{
        const usuario = await userModel.findOne({ _id: id })
        return usuario.recipe
        }catch(err){
            console.log(err)
            throw new error ("Error in getCountUser service")
        }
    }
    
    async postRecetasGuardadas(id, nuevaReceta) {
        try {
            console.log(id);
    
            const usuario = await userModel.findOne({ _id: id });
            
            if (usuario && usuario.recipe.includes(nuevaReceta)) {
                console.log('La receta ya está guardada para este usuario.');
                return false; 
            }
    
            // Si la receta no existe, se agrega al array 'recipe'
            const receta = await userModel.findOneAndUpdate(
                { _id: id },
                { $push: { recipe: nuevaReceta } },
                { new: true }
            );
    
            console.log('Receta guardada correctamente.');
            return true;
    
        } catch (err) {
            console.error(err);
            throw new Error("Error in postRecetasGuardadas service");
        }
    }
    

    async changeUser(id, name, lastname, email){
        try{
        let isRegistred = await userModel.findOne({email:email})
        console.log(isRegistred)
        if (isRegistred){
            throw new Error("User already registred")
        }else{
            console.log(id)
        const result = await userModel.updateOne({ _id: id }, { $set: { name, lastname, email } });
        return true
        }
        }catch(err){
            console.log(err)
            throw new error ("Error in getCountUser service")
        }
    }
}

module.exports = new UserService();