const express = require(`express`);
const path = require('path');

app = express()

exports.logotipo = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/img/logotipo.png'))

}

exports.favicon = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/img/favicon.png'))

}

exports.excel = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/img/excel.png'))

}

exports.img_chamado = function (req, res) {
    res.sendFile(path.join(__dirname, `./../public/chamadosimg/${req.params.codigo}.png`))
}