'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs'); // cifrado de password
var fs = require('fs');

var path = require('path');

//modelos
var Utilisateur = require('../models/utilisateur');

//service jwt
var jwt = require('../services/jwt');

//acciones

function pruebas(req,res){
    res.status(200).send({
        message: 'Probando el controlador de utilisateur y la accion pruebas',
        user:req.user
    });
}

function saveUtilisateur(req,res){
    
    var user = new Utilisateur(); //crear el objeto del usuario
    var params = req.body; //recojer parametros peticion
    console.log(params);  
   

    if (params.password && params.name && params.surname && params.email) {
         //asignar valores al objeto de usuario
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.image = null;
    user.description = params.description;

    Utilisateur.findOne({email:user.email.toLowerCase()},(err,issetUser)=>{
        if(err){
            res.status(500).send({message:'Error al comprobar el usuario'});
        }else{
            if(!issetUser){
                bcrypt.hash(params.password,null,null,function(err,hash){  // cifrar contraseña
                    user.password = hash;
                });
                
                user.save((err,userStored)=>{   // guardo usuario en base de datos
                  if(err){
                      res.status(500).send({message:'Error al guardar el usuario'});
                  }else{
                      if(!userStored){
                        res.status(404).send({message:'No se ha registrado el usuario'});
                      }else{
                          res.status(200).send({user:userStored});
                      }
                  }
                });
            }else{
                res.status(200).send({
                    message:'El usuario no puede regristrarse porque ya existe'
                });
            }
        }
    });

    }else{
        res.status(200).send({
            message:'Introduce los datos correctamente para poder registrar al usuario'
        });
    }
}

function login(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    Utilisateur.findOne({email: email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message:'Error al comprobar el usuario'});
        }else{
            if(user){
                bcrypt.compare(password,user.password, (err,check)=> {
                    if(check){
                        if (params.gettoken) {   // comprobar y generar el token
                            //devolver token jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                           
                        } else {
                            res.status(200).send({user});
                        }
                       
                    }else{
                        res.status(404).send({
                            message:'El usuario no ha podido loguearse correctamente'
                        });
                    }
                });
                
            }else{
                res.status(404).send({
                    message:'El usuario no ha podido loguearse'
                });
            }
        }
    
});
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){
        return res.status(500).send({
            message: 'no tienes permiso para actualizar el usuario'
        });
    }

    Utilisateur.findByIdAndUpdate(userId,update,{new:true},(err,userUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al actualizar usuario'
            });
        }else{
            if (!userUpdated) {
                res.status(404).send({message:'no se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user:userUpdated});
            }
        }
    });
   
}

function uploadImage(req,res){
     var userId = req.params.id;
     var file_name = 'no subido...';

     if(req.files){
         var file_path = req.files.image.path;
         var file_split = file_path.split('\\');
         var file_name= file_split[2];

         var ext_split = file_name.split('\.');
         var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'jpeg'|| file_ext == 'gif') {
            
            if (userId != req.user.sub) {
                return res.status(500).send({message:'no tienes permiso para actualizar el usuario '})
            }



            Utilisateur.findByIdAndUpdate(userId,{image:file_name},{new:true},(err,userUpdated)=>{
                if(err){
                    res.status(500).send({
                        message:'Error al actualizar usuario'
                    });
                }else{
                    if (!userUpdated) {
                        res.status(404).send({message:'no se ha podido actualizar el usuario'});
                    }else{
                        res.status(200).send({user:userUpdated,image: file_name});
                    }
                }
            });
        
        }else{
            fs.unlink(file_path,(err)=>{
                if (err) {
                    res.status(200).send({message:'Extension no validad y fichero no borrado'});
                } else {
                    
                }
            });
            res.status(200).send({message : 'Extension no valida'});
        }

       
     }else{
        res.status(200).send({message : 'no hemos subido un fichero'});
     }
}

function getImageFile(req,res){
    
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;

    fs.exists(path_file,function (exists) {
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'la imagen no existe'});
        }
    });


}


module.exports = {
    pruebas,
    saveUtilisateur,
    login,
    updateUser,
    uploadImage,
    getImageFile
};