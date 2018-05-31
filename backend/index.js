'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.connect('mongodb://localhost:27017/goodeed_db',function (err,res) {
    if(err){
      throw err;
    }else{
        console.log('La conexion a la base de datos goodeed_db se ha realizado correctamente');

        app.listen(port,() =>{
            console.log("Le serveur local avec node et express is running");
        }

        );
    }
});