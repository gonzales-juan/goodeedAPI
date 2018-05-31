'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonSchema = Schema({
       utilisateur: {type: Schema.ObjecId, ref:'Utilisateur'},
       compteur_de_dons : Number
    });

    module.exports = mongoose.model('Don',DonSchema);