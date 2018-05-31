'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampagneSchema = Schema({
       titre: String,
       annonceur_lie : String,
       lien_video: String,
       ficher_image_banniere : String,
       url_de_redirection:String
    });

    module.exports = mongoose.model('Campagne',CampagneSchema);