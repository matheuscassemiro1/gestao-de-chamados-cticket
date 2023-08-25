const Sequelize = require('sequelize');
const db = require('./Banco.js');

class Chamado extends Sequelize.Model { }

Chamado.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    setor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    acao: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    fechado_por: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    ip_autor: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    codigo_imagem: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {sequelize: db, modelName: 'chamados'})

Chamado.sync()
module.exports = Chamado