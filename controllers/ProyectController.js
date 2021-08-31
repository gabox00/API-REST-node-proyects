'use strict'

var ProyectModel = require('../models/ProyectModel');
var fs = require('fs');
var path = require('path');

var ProyectController = {

    home: function(req,res){
        return res.status(200).send({
            message: 'soy la home'
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message: 'soy test del controller ProyectController'
        });
    },

    saveProyect: function(req,res){
        var proyect = new ProyectModel();

        proyect.name = req.body.name;
        proyect.description = req.body.description;
        proyect.category = req.body.category;
        proyect.year = req.body.year;
        proyect.langs = req.body.langs;
        proyect.image = req.body.image;

        proyect.save((err, proyectStored) => {
            if(err) return res.status(500).send({message: "error al guardar"});
            if(!proyectStored) return res.status(404).send({message:"No se ha podido guardar el proyecto"});

            return res.status(200).send({proyect:proyectStored});
        });
    },

    getProyect: function(req,res){
        var proyectID = req.params.id;
        
        if(proyectID == null) return res.status(404).send("No se ha podido recibir el proyecto");

        ProyectModel.findById(proyectID,(err,proyect) => {
            if(err) return res.status(500).send({message:"error al recibir datos"});
            if(!proyect) return res.status(404).send({message:"No se ha podido recibir el proyecto"});

            return res.status(200).send({proyect});
        });
    },

    getProyects: function(req,res){
        ProyectModel.find({}).exec((err, proyects) => {
            if(err) return res.status(500).send({message:"error al recibir datos"});
            if(!proyects) return res.status(404).send({message:"No se han podido recibir los proyectos"});

            return res.status(200).send({proyects});
        })
    },

    updateProyect: function(req,res){
        var proyectID = req.params.id;
        var proyectForUpdate = req.body;

        if(proyectID == null) return res.status(404).send("El proyecto no existe");

        ProyectModel.findByIdAndUpdate(proyectID, proyectForUpdate, (err, proyectUpdated) => {
            if(err) return res.status(500).send({message:"error al actualizar datos"});
            if(!proyectUpdated) return res.status(404).send({message:"No se ha podido actualizar el proyecto"});

            return res.status(200).send({proyect:proyectUpdated});
        });
    },

    deleteProyect: function(req,res){
        var proyectID = req.params.id;

        if(proyectID == null) return res.status(404).send("El proyecto no existe");

        ProyectModel.findByIdAndDelete(proyectID, (err, proyectDeleted) => {
            if(err) return res.status(500).send({message:"Error al Eliminar Proyecto"});

            return res.status(200).send({proyect:proyectDeleted});
        });
    },

    uploadImage: function(req,res){
        var proyectID = req.params.id;
        var fileName = 'Imagen no subida...';

        if(proyectID == null) return res.status(404).send("El proyecto no existe"); 

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var fileExt = fileName.split('\.')[1];

            if(fileExt == 'PNG' || fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif' || fileExt == 'jpeg'){
                ProyectModel.findByIdAndUpdate(proyectID, { image: fileName }, {new: true}, (err, proyectUpdated) => {
                    if(err) return res.status(500).send({message:"Error al actualizar la imagen del proyecto"});
                
                    if(!proyectUpdated) return res.status(404).send({message:"No se ha podido actualizar el proyecto"});
    
                    return res.status(200).send({proyect:proyectUpdated})
                });
            }
            else{
                fs.unlink(filePath, () => {
                    return res.status(500).send({error:"la extension no es valida"});
                });
            }
        }       
        else
            return res.status(200).send({error:fileName})      
    },

    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        })
    }
};

module.exports = ProyectController;