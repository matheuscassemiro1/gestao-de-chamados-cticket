formBuscaChamados = document.getElementById('formBuscaChamados')
formBuscaChamados.addEventListener("submit", (e) => {
    e.preventDefault();

    let dataInicio = document.getElementById("dataInicio");
    let dataFim = document.getElementById("dataFim");

    if (dataInicio.value.search('-') == -1 || dataFim.value.search('-') == -1) {
        alert("Insira uma data de início e uma data final para a busca.")
    }
    else {
        fetch('http://localhost:80/api/chamadofiltro', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "dataInicio": dataInicio.value, "dataFim": dataFim.value })
        }).then(async function (retorno) {
            resposta = await retorno.json()
            if (resposta.status == 'sucesso') {
                chamados = resposta.chamados
                document.getElementById('modalFiltroChamados').classList.remove('show');
                document.getElementById('modalFiltroChamados').style = ''
                document.getElementById('tabela').style.visibility = 'visible';
                document.getElementById('qtChamados').textContent = resposta.chamados.length
                document.getElementById('caminhoRelatorio').href += `${dataInicio.value}-${dataFim.value}`
                document.getElementById('rangeInicio').textContent = moment(dataInicio.value, 'YYYY-MM-DD').format('DD/MM/YYYY')
                document.getElementById('rangeFim').textContent = moment(dataFim.value, 'YYYY-MM-DD').format('DD/MM/YYYY')
                chamados.forEach(chamado => {
                    const tr = document.createElement('tr');
                    tr.id = `tr${chamado.id}`
                    document.getElementById('corpotabela').appendChild(tr)

                    const n = document.createElement('td')
                    n.textContent = chamado.id
                    const autor = document.createElement('td')
                    autor.textContent = chamado.autor
                    const setor = document.createElement('td')
                    setor.textContent = chamado.setor
                    const tipo = document.createElement('td')
                    if (chamado.tipo) {
                        tipo.textContent = chamado.tipo
                    } else {
                        tipo.textContent = ''
                    }
                    const descricao = document.createElement('td')
                    descricao.textContent = chamado.descricao
                    const estado = document.createElement('td')
                    estado.textContent = chamado.estado
                    const acao = document.createElement('td')
                    acao.textContent = chamado.acao
                    const fechado_por = document.createElement('td')
                    const datafinalizacao = document.createElement('td')
                    const codigo_imagem = document.createElement('td')
                    if (chamado.codigo_imagem){
                        codigo_imagem.textContent = chamado.codigo_imagem
                    }
                    if (chamado.fechado_por) {
                        fechado_por.textContent = chamado.fechado_por

                        datafinalizacao.textContent = moment(chamado.updatedAt, 'YYYY-MM-DD H:mm:ss').format('DD/MM/YYYY H:mm:ss')
                    } else {
                        tr.classList.add('table-warning')
                        fechado_por.textContent = ''
                        datafinalizacao.textContent = ''
                    }
                    document.getElementById(`tr${chamado.id}`).appendChild(n)
                    document.getElementById(`tr${chamado.id}`).appendChild(autor)
                    document.getElementById(`tr${chamado.id}`).appendChild(setor)
                    document.getElementById(`tr${chamado.id}`).appendChild(tipo)
                    document.getElementById(`tr${chamado.id}`).appendChild(descricao)
                    document.getElementById(`tr${chamado.id}`).appendChild(estado)
                    document.getElementById(`tr${chamado.id}`).appendChild(acao)
                    document.getElementById(`tr${chamado.id}`).appendChild(fechado_por)
                    document.getElementById(`tr${chamado.id}`).appendChild(datafinalizacao)
                    document.getElementById(`tr${chamado.id}`).appendChild(codigo_imagem)

                })
            }
            else { alert(`Ocorreu um erro! Tente novamente.`) }
        })
    }

})



