'use strict'

//modulos
var fs = require('fs');

var path = require('path');

//modelos
var Utilisateur = require('../models/utilisateur');
var Projet = require('../models/projet');

//acciones
function pruebas(req,res){
    res.status(200).send({
        message: 'Probando el controlador de projet y accion pruebas',
        user:req.user
    });
}

function saveProjet(req,res){
    var projet = new Projet();
    var params = req.body;

    

    if(params.titre){
    projet.titre = params.titre;
    projet.association_liee = params.association_liee;
    projet.description = params.description;
    projet.logo = null;
    projet.photos = null;
    projet.nombre_dons_atteindre = params.nombre_dons_atteindre;
    projet.nombre_dons_actuel = params.nombre_dons_actuel;
    projet.status = params.status;
    

    projet.save((err,projetStored)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if (!projetStored) {
                res.status(404).send({message: 'nose e ha guardado el animal'});
            }else{
                    res.status(200).send({projet : projetStored});
            }
        }
    });

    }else{
    res.status(200).send({message:' El nombre del project es obligatorio' })
        }
}

function getProjets(req,res){
    Projet.find({},function (err,projets) {
        if(err){
            res.status(500).send({ message : 'Error en la peticion'});
        }else{
            if(!projets){
                res.status(404).send({ message : 'No hay projects'});
            }else{
                res.status(200).send({ projets});
            }
        
        }    
    });
}

function getProjet(req,res){
    var projetId = req.params.id;
    Projet.findById(projetId,function (err,projet) {
        if(err){
            res.status(500).send({ message : 'Error en la peticion'});
        }else{
            if(!projet){
                res.status(404).send({ message : 'No hay project'});
            }else{
                res.status(200).send({ projet});
            }
        
        }    
    });
   
};

function updateProjet(req,res) {
    var projetId = req.params.id;
    var update = req.body;

    Projet.findByIdAndUpdate(projetId,update,{new:true},(err,projetUpdated)=>{
        if(err){
            res.status(500).send({ message : 'Error en la peticion'});
        }else{
            if(!projetUpdated){
                res.status(404).send({ message : 'no se ha actualizado el projet'});
            }else{
                res.status(200).send({ projet : projetUpdated});
            }
        
        }  
    });
    
}


function uploadImage(req,res){
    var projetId = req.params.id;
    var file_name = 'no subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name= file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
       if (file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'jpeg'|| file_ext == 'gif') {
           
           Projet.findByIdAndUpdate(projetId,{image:file_name},{new:true},(err,projetUpdated)=>{
               if(err){
                   res.status(500).send({
                       message:'Error al actualizar usuario'
                   });
               }else{
                   if (!projetUpdated) {
                       res.status(404).send({message:'no se ha podido actualizar el projet'});
                   }else{
                       res.status(200).send({projets: projetUpdated,image: file_name});
                   
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
   var path_file = './uploads/projets/'+imageFile;

   fs.exists(path_file,function (exists) {
       if(exists){
           res.sendFile(path.resolve(path_file));
       }else{
           res.status(404).send({message: 'la imagen no existe'});
       }
   });


}

function deleteProjet(req,res) {
    var projetId = req.params.id;
    Projet.findByIdAndRemove(projetId,(err,projetRemoved)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!projetRemoved){
                res.status(404).send({message: 'no se ha podido borrar el projet'});
            }else{
                res.status.send({projet:projetRemoved});
            }

        }
    });
}



module.exports = {
    pruebas,
    saveProjet,
    getProjets,
    getProjet,
    updateProjet,
    uploadImage,
    getImageFile,
    deleteProjet

}