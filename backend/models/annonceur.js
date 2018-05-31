'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnonceurSchema = Schema({
       nom: String,
       description : String,
       logo: String,
       photos: String,
       campagnes:{type: Schema.ObjecId, ref:'Campagne'},
    });

    module.exports = mongoose.model('Annonceur',AnnonceurSchema);