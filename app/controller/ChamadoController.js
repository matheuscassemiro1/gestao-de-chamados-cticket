const Chamado = require("./../model/Chamado");
const { Op } = require('sequelize')
const ExcelJS = require('exceljs');
const moment = require('moment')
const { formidable } = require('formidable')
const fs = require('fs')
const path = require('path');


exports.listarChamados = async function (req, res, next) {
    aux = await Chamado.findAll({ where: { estado: 'em andamento' } })
    res.send(JSON.stringify({ status: 'sucesso', chamados: aux }))
}

exports.contarDashboard = async function (req, res, next) {
    concluidos = await Chamado.count({ where: { estado: 'solucionado' }, createdAt: { [Op.between]: [`${req.body.dataInicio} 00:00:00`, `${req.body.dataFim} 23:59:59`] } })
    andamento = await Chamado.count({ where: { estado: 'em andamento' }, createdAt: { [Op.between]: [`${req.body.dataInicio} 00:00:00`, `${req.body.dataFim} 23:59:59`] } })
    total = await Chamado.count({ where: { createdAt: { [Op.between]: [`${req.body.dataInicio} 00:00:00`, `${req.body.dataFim} 23:59:59`] } } })
    res.send(JSON.stringify({ status: 'sucesso', total: total, concluidos: concluidos, andamento: andamento }))
}

exports.filtrarChamados = async function (req, res, next) {
    aux = await Chamado.findAll({ where: { createdAt: { [Op.between]: [`${req.body.dataInicio} 00:00:00`, `${req.body.dataFim} 23:59:59`] } }, order: [['createdAt', 'DESC']] })
    if (aux) {
        // polyfills required by exceljs
        const pagina = new ExcelJS.Workbook()
        pagina.creator = 'cticket';
        pagina.lastModifiedBy = 'cticket';
        pagina.created = new Date(1985, 8, 30);
        pagina.modified = new Date();
        pagina.lastPrinted = new Date();
        pagina.properties.date1904 = true;
        pagina.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ]
        const arquivo = pagina.addWorksheet('Pagina');
        const valores = [];
        valores[0] = 'ID';
        valores[1] = 'Autor';
        valores[2] = 'Setor';
        valores[3] = 'Titulo';
        valores[4] = 'Descrição';
        valores[5] = 'Estado';
        valores[6] = 'Solução';
        valores[7] = 'Fechado por';
        valores[8] = 'Ip autor'
        valores[9] = 'Tipo';
        valores[10] = 'Data de Abertura';
        valores[11] = 'Data de Fechamento';
        valores[12] = 'ID Imagem';
        arquivo.addRow(valores);
        aux.forEach((chamado) => {
            const valores2 = [];
            valores2[0] = `${chamado.id}`;
            valores2[1] = `${chamado.autor}`;
            valores2[2] = `${chamado.setor}`;
            valores2[3] = `${chamado.titulo}`;
            valores2[4] = `${chamado.descricao}`;
            valores2[5] = `${chamado.estado}`;
            valores2[8] = `${chamado.ip_autor}`;
            valores2[10] = `${moment(chamado.createdAt).format('DD/MM/YYYY')}`;
            if (chamado.fechado_por) {
                valores2[6] = `${chamado.acao}`;
                valores2[7] = `${chamado.fechado_por}`;
                valores2[9] = `${chamado.tipo}`;
                valores2[11] = `${moment(chamado.updatedAt).format('DD/MM/YYYY')}`;
            }
            if (chamado.codigo_imagem){
                valores2[12] = `${chamado.codigo_imagem}`;
            }
            arquivo.addRow(valores2);
        })

        async function a() {
            await pagina.xlsx.writeFile(__dirname + `./../public/relatorios/${req.body.dataInicio}-${req.body.dataFim}.xlsx`);
        }
        aux2 = await a(arquivo)
    }
    res.send(JSON.stringify({ status: 'sucesso', chamados: aux }))

}


exports.abrirChamado = async function (req, res, next) {
    //RECEBER A IMAGEM
    let form = formidable({})
    let fields;
    let files;
    [fields, files] = await form.parse(req);
    if (files.imagem) {
        const caminhoTemporario = files.imagem[0].filepath;
        aux = files.imagem[0].originalFilename
        aux2 = aux.split('.')
        tipo = aux2[1]
        const novoCaminho = path.join(__dirname + './../public/chamadosimg', `${files.imagem[0].newFilename}` + `.${aux2[1]}`);
        fs.renameSync(caminhoTemporario, novoCaminho);

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ipv4 = ip.split(':').pop();
        aux = await Chamado.create({
            autor: req.session['nome'],
            setor: req.session['setor'],
            titulo: fields.titulo[0],
            descricao: fields.descricao[0],
            estado: 'em andamento',
            ip_autor: ipv4,
            codigo_imagem: files.imagem[0].newFilename
        })
        res.send(JSON.stringify({ status: 'sucesso', chamados: aux }))
    }
    else {
        ///PEGAR IP DA MÁQUINA
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ipv4 = ip.split(':').pop();
        aux = await Chamado.create({
            autor: req.session['nome'],
            setor: req.session['setor'],
            titulo: fields.titulo[0],
            descricao: fields.descricao[0],
            estado: 'em andamento',
            ip_autor: ipv4
        })
        res.send(JSON.stringify({ status: 'sucesso', chamados: aux }))
    }
}


exports.fecharChamado = async function (req, res, next) {
    try {
        aux = await Chamado.update({ tipo: req.body.tipo, acao: req.body.solucao, fechado_por: req.session.nome, estado: "solucionado" }, { where: { id: req.body.id_chamado } })
        if (aux) {
            res.send(JSON.stringify({ status: 'sucesso', mensagem: aux }))
        }
        else {
            res.send(JSON.stringify({ status: 'falha', mensagem: aux }))
        }
    }
    catch (erro) { console.log(erro) }
}
