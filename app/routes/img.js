const express = require(`express`);
const imgRouter = express.Router()
const path = require('path');
const ImagensController = require('../controller/ImagensController')


imgRouter.get('/logotipo', ImagensController.logotipo);
imgRouter.get('/favicon', ImagensController.favicon);
imgRouter.get('/excel', ImagensController.excel);
imgRouter.get('/:codigo', ImagensController.img_chamado);

module.exports = imgRouter;