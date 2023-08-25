const express = require(`express`);
const router = express.Router()
const path = require('path');
const PaginasController = require('../controller/PaginasController')

function autenticadoAdmin (req, res, next){
    if (req.session.admin == true && req.session.autenticado == true){
        next()
    }
    else{
        res.redirect('/')
    }
}

function autenticado (req, res, next){
    if (req.session.autenticado == true){
        next()
    }
    else{
        res.redirect('/')
    }
}

router.get('/gestao', autenticadoAdmin, PaginasController.dashboard);
router.get('/chamado', autenticado, PaginasController.abrirchamado);
router.get('/chamadoadmin', autenticadoAdmin, PaginasController.abrirchamadoadmin);
router.get('/listarchamados', autenticadoAdmin, PaginasController.listarchamadosabertos);
router.get('/filtrarchamados', autenticadoAdmin, PaginasController.listarchamadosabertospordata);
router.get('/usuarios', autenticadoAdmin, PaginasController.usuarios);
router.get('/sair', async function(req, res, next){
    req.session.destroy()
    res.redirect('/')
});

router.get('/relatorios/:nome', autenticadoAdmin, PaginasController.relatorio);


module.exports = router;