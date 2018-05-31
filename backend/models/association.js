'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssociationSchema = Schema({
       nom: String,
       description : String,
       logo: String,
       projects : {type: Schema.ObjecId, ref:'Project'}
    });

    module.exports = mongoose.model('Association',AssociationSchema);