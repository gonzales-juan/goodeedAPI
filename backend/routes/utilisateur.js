'use strict'

var express = require('express');
var UtilisateurController = require('../controllers/utilisateur');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});

api.get('/pruebas-del-controlador',md_auth.ensureAuth,UtilisateurController.pruebas);
api.post('/register',UtilisateurController.saveUtilisateur);
api.post('/login',UtilisateurController.login);
api.put('/update-user/:id',md_auth.ensureAuth,UtilisateurController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UtilisateurController.uploadImage);
api.get('/get-image-file/:imageFile',UtilisateurController.getImageFile);
module.exports = api;