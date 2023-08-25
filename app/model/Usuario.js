const Sequelize = require('sequelize');
const db = require('./Banco.js');
const adminPadrao = require("./../controller/UsuarioController");
class Usuario extends Sequelize.Model { }

Usuario.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    setor: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, { sequelize: db, modelName: 'usuarios' })

Usuario.sync().then(() => {
    adminPadrao.coringa()
}

)

module.exports = Usuario