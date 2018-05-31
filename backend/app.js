'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// charger les routes
var utilisateur_routes = require('./routes/utilisateur');
var projet_routes = require('./routes/projet');
// middlewares de body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras y cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Acces-Control-Allow-Methos','GET, POST, OPTIONS, PUT, DELETE')
});

// rutas base
app.use('/api',utilisateur_routes);
app.use('/api',projet_routes);
//rutas body-parser



module.exports = app;