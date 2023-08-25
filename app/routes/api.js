const express = require(`express`);
const api = express.Router()
const path = require('path');
const UsuarioController = require('../controller/UsuarioController')
const ChamadoController = require('../controller/ChamadoController')


function autenticado (req, res, next){
    if (req.session.autenticado == true){
        next()
    }
    else{
        res.redirect('/')
    }
}

function autenticadoAdmin (req, res, next){
    if (req.session.admin == true && req.session.autenticado == true){
        next()
    }
    else{res.send(JSON.stringify({status: 'falha', mensagem: 'você não está autenticado'}))}
}
//LOGIN CONTROL
api.post('/login', UsuarioController.tryLogin);

//DASHBOARD
api.post('/dashboard', autenticadoAdmin, ChamadoController.contarDashboard);

//USUÁRIOS CRUD
api.post('/usuarios', autenticadoAdmin, UsuarioController.criarUsuario);
api.get('/usuarios', autenticadoAdmin, UsuarioController.listarUsuarios);
api.put('/usuarios', autenticadoAdmin, UsuarioController.alterarUsuario);
api.delete('/usuarios', autenticadoAdmin, UsuarioController.deletarUsuario);

//CHAMADOS
api.post('/chamadofiltro', autenticadoAdmin, ChamadoController.filtrarChamados);
api.get('/chamado', autenticadoAdmin, ChamadoController.listarChamados);
api.post('/chamado', autenticado, ChamadoController.abrirChamado);
api.put('/chamado', autenticadoAdmin, ChamadoController.fecharChamado);









module.exports = api;