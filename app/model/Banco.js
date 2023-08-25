const Sequelize = require("sequelize");


const sequelize = new Sequelize("cticket", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    timezone: '-03:00',
    dialectOptions: {

        dateStrings: true,
        typeCast: true,
        timezone: "-03:00"
    },
    timezone: "-03:00",
});

sequelize.authenticate()
    .then(function () {
        console.log("Banco de dados conectado com sucesso.");

    }).catch(function () {
        console.log("Não foi possível se conectar ao banco de dados")
    })


module.exports = sequelize;