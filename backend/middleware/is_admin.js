'use strict'

exports.isAdmin = function(req,res,next){
    if (req.utilisateur.role != 'ROLE_ADMIN') {
        return res.status(200).send({message : ' no tienes acceso a esta zona'});
    }

}