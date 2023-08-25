const Usuario = require("./../model/Usuario");
const bcrypt = require('bcrypt')

exports.tryLogin = async function (req, res, next) {
    if (req.session.autenticado == true) {
        res.redirect('/pages/gestao')
    }
    try {
        aux = await Usuario.findOne({ where: { login: req.body.login } })
        if (bcrypt.compareSync(req.body.senha, aux.dataValues.senha)) {
            req.session.autenticado = true;
            req.session.login = aux.dataValues.login;
            req.session.setor = aux.dataValues.setor;
            req.session.nome = aux.dataValues.nome;
            req.session.admin = aux.dataValues.admin;
            res.send(JSON.stringify({ status: 'sucesso', mensagem: 'você está logado', admin: aux.dataValues.admin, nome: aux.dataValues.nome }))
        }
        else {
            console.log('Errou login ou senha')
            res.send(JSON.stringify({ status: 'falha', mensagem: `login ou senha incorretos` }))
        }
    }

    catch {
        console.log('Falha no try catch do login')
        res.send(JSON.stringify({ status: 'falha', mensagem: `login ou senha incorretos` }))
    }
}

exports.criarUsuario = async function (req, res, next) {
    try {
        buscarLogin = await Usuario.findOne({ where: { login: req.body.login } })
        if (buscarLogin) {
            res.send({ status: 'falha', mensagem: 'o usuário já existe no banco' })
        }
        else {
            salt = 10;
            pass = bcrypt.hashSync(req.body.senha, salt)
            aux = await Usuario.create({
                login: req.body.login,
                senha: pass,
                admin: req.body.admin,
                nome: req.body.nome,
                setor: req.body.setor
            })
            res.send(JSON.stringify({ status: 'sucesso', mensagem: `O usuário ${req.body.login} foi criado com sucesso.` }))
        }

    }
    catch {
        res.send('falha');
    }
}

exports.listarUsuarios = async function (req, res, next) {
    aux = await Usuario.findAll()
    res.send(JSON.stringify({ status: 'sucesso', usuarios: aux }))
}


exports.alterarUsuario = async function (req, res, next) {
    try {
        if (req.body.senha) {
            salt = 10;
            req.body.senha = bcrypt.hashSync(req.body.senha, salt)
        }
        aux = await Usuario.update({ nome: req.body.nome, senha: req.body.senha }, { where: { id: req.body.id } })
        console.log(aux)
        if (aux == 1) {
            res.send(JSON.stringify({ status: 'sucesso', mensagem: `O usuario ${req.body.login} foi alterado com sucesso` }))
        }

        else {
            res.send(JSON.stringify({ status: 'falha', mensagem: `O usuario ${req.body.login} não foi alterado` }))
        }
    }
    catch (erro) {
        console.log(erro)
    }

}

exports.coringa = async function () {
    aux = await Usuario.findOne({ where: { login: 'admin' } })
    if (!aux) {
        salt = 10;
        pass = bcrypt.hashSync('admin', salt)
        aux = await Usuario.create({
            login: 'admin',
            senha: pass,
            admin: true,
            nome: 'ADM GERAL',
            setor: 'ti'
        })
        console.log('ADM GERAL CRIADO')
    }
}

exports.deletarUsuario = async function (req, res, next) {
    try {
        aux = await Usuario.destroy({ where: { id: req.body.id } })
        if (aux == 1) {
            res.send(JSON.stringify({ status: 'sucesso', mensagem: `O usuario ${req.body.login} foi excluido com sucesso` }))
        }
        else {
            res.send(JSON.stringify({ status: 'falha', mensagem: `O usuario ${req.body.login} NÃO foi excluido com sucesso` }))
        }
    }
    catch (erro) { console.log(erro) }

}