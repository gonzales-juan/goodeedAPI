'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjetSchema = Schema({
       titre : String,
       association_liee : String,
       description:String,
       logo:String,
       image: String,
       nombre_dons_atteindre : Number,
       nombre_dons_actuel : Number,
       status:String
    });

    
    module.exports = mongoose.model('Projet',ProjetSchema);