async function listarDados(){
    let data = moment().format('YYYY-MM')
    let inicio = data + "-01"
    let fim = data + "-31"
    fetch('http://localhost:80/api/dashboard', {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({dataInicio: inicio, dataFim: fim})
    }).then(async function (retorno){
        resultado = await retorno.json()
        if (resultado.status == 'sucesso'){
            document.getElementById('valorTotal').textContent = resultado.total
            document.getElementById('valorAbertos').textContent = resultado.andamento
            document.getElementById('valorFechados').textContent = resultado.concluidos
        }
    })
}

module.exports = {listarDados}