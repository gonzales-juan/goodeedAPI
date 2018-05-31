'use strict'

var express = require('express');
var ProjetController = require('../controllers/projet');

var api = express.Router();
var md_auth = require('../middleware/authenticated');
//var md_admin = require('../middleware/is_admin');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/projets'});

api.get('/pruebas-projet',md_auth.ensureAuth,ProjetController.pruebas);
api.post('/projet',md_auth.ensureAuth,ProjetController.saveProjet);
api.get('/projets',ProjetController.getProjets);
api.get('/projet/:id',ProjetController.getProjet);
api.put('/projet/:id',md_auth.ensureAuth,ProjetController.updateProjet);
api.post('/upload-image-projet/:id',[md_auth.ensureAuth,md_upload],ProjetController.uploadImage);
api.get('/get-image-projet/:imageFile',ProjetController.getImageFile);
api.delete('/projet/:id',md_auth.ensureAuth,ProjetController.deleteProjet);
module.exports = api;