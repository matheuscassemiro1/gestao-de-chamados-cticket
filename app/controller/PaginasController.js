const express = require(`express`);
const path = require('path');
const fs = require('fs')
app = express()

exports.abrirchamado = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/pages/abrirchamado.html'))

}

exports.abrirchamadoadmin = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/pages/abrirchamadoadmin.html'))

}

exports.listarchamadosabertos = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/pages/listarchamadosabertos.html'))

}

exports.listarchamadosabertospordata = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/pages/listarchamadospordata.html'))

}

exports.usuarios = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/pages/usuarios.html'))

}

exports.dashboard = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/pages/dashboard.html'))


}

exports.relatorio = function (req, res) {
    destino = path.join(__dirname, `./../public/relatorios/${req.params.nome}.xlsx`);
    res.sendFile(path.join(__dirname, `./../public/relatorios/${req.params.nome}.xlsx`))
}

