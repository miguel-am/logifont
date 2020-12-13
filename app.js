'use strict'

//cargar modulos de node para crear servidor

var express = require('express');
var bodyParse = require('body-parser');
require("dotenv").config();

//ejecutar express(http)

var app = express();

//cargar ficheros rutas

var partner = require('./Routes/Partner');

//Middlewares

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijos a rutas

app.use('/api',partner);

//ruta o metodo de prueba para el API

/*app.post('/probando',(req,res) =>{

    var hola =req.body.hola;

    return res.status(200).send({

        curso:'Master en Frameworks JS',
        autor: 'Miguel Angel',
        url:'miguell.es',
        hola
    });

})*/

//exportar modulo(fichero actual)

module.exports =app;