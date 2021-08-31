'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log("La conexion a la BD se ha hecho correctamente");

        app.listen(port, () => {
            console.log("El servidor esta activo: localhost:3700");
        })
    })
    .catch( error => {
        console.log(error);
    });
    