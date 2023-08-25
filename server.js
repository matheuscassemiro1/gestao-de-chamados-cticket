const express = require(`express`);
const session = require('express-session');
const store = new session.MemoryStore;
const path = require('path');
const routes = require('./app/routes/routes')
const imgRouter = require('./app/routes/img')
const apiRouter = require('./app/routes/api')
const Chamado = require("./app/model/Chamado")
const Usuario = require("./app/model/Chamado")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const fs = require('fs/promises')
const porta = 80;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app = express()

app.use(express.static(__dirname + '/app/public'))

app.disable('x-powered-by');


//REGRAS DE SESSÃO BASEADA EM COOKIES
// SESSÕES DE 08H ~~ JORNADA DE TRABALHO
app.use(session({
    secret: 'ct1ck3tsueth4m',
    resave: false,
    cookie: { maxAge: 28800000 },
    saveUninitialized: false,
    store
}))

//REGRA PARA RECEBER DADOS VINDOS EM CABEÇALHO E CORPO DAS REQUISIÇÕES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', async function (req, res, next) {
    if (req.session.autenticado == true) {
        if (req.session.admin) {
            res.redirect('pages/gestao')
        }
        else {
            res.redirect('pages/chamado')
        }
    } else {
        res.sendFile(path.join(__dirname, './app/public/pages/login.html'))
    }

})




async function deleteAllFilesInDir(dirPath) {
    try {

        const files = await fs.readdir(dirPath);

        const deleteFilePromises = files.map(file =>
            fs.unlink(path.join(dirPath, file)),
        );

        await Promise.all(deleteFilePromises);
    } catch (err) {
        console.log(err);
    }
}

///DELETA OS ARQUIVOS DE EXCEL GERADOS A CADA INICIO DO PROGRAMA
deleteAllFilesInDir('./app/public/relatorios').then(() => {
    console.log('Os relatórios gerados anteriormente foram apagados');
});

app.use('/imagens', imgRouter)
app.use(`/pages`, routes);
app.use(`/api`, apiRouter);

app.listen(porta, function () {
    console.log(`Servidor web ligado na porta ${porta}`)
})