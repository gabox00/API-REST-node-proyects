'use strict'

var express = require('express');
var proyectController = require('../controllers/ProyectController');
var router = express.Router();

var multiparty = require('connect-multiparty');
const ProyectController = require('../controllers/ProyectController');
var multipartyMiddleware = multiparty({ uploadDir: './uploads'});

router.get('/home',proyectController.home);
router.post('/test',proyectController.test);
router.post('/saveProyect',proyectController.saveProyect);
router.get('/proyect/:id?',proyectController.getProyect);
router.get('/proyects',proyectController.getProyects);
router.put('/update-proyect/:id?',proyectController.updateProyect);
router.delete('/delete-proyect/:id?',proyectController.deleteProyect);
router.post('/upload-image/:id?',multipartyMiddleware,proyectController.uploadImage);
router.get('/get-image/:image?', ProyectController.getImageFile);

module.exports = router;