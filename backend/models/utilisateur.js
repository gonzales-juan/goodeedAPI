'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UtilisateurSchema = Schema({
name: String,
surname:String,
email:String,
password:String,
image: String,
description:String

});

module.exports = mongoose.model('Utilisateur',UtilisateurSchema);