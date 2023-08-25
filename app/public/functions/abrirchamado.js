modalForm = document.getElementById('modalForm')
modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let tituloDoProblema = document.getElementById("tituloDoProblema");
    let descricaoDoProblema = document.getElementById("descricaoDoProblema");
    

    if (tituloDoProblema.value == "" || descricaoDoProblema.value == "") {
        alert("Insira um título e uma descrição para o chamado")
    }
    else {
        let formdata = new FormData()
        let arquivo = document.getElementById("arquivo");
        formdata.append('imagem', arquivo.files[0]);
        formdata.append('descricao', descricaoDoProblema.value);
        formdata.append('titulo', tituloDoProblema.value);
        fetch('http://localhost:80/api/chamado', {
            method: 'POST',
            body: formdata
        }).then(async function (retorno) {
            aux = await retorno.json()
            if (aux.status == 'sucesso'){
                alert("O seu chamado foi aberto. Basta aguardar!")
                location.reload()
            }
            else{
                console.log(retorno)
                alert('Não foi possível abrir o seu chamado, tente novamente.')
                //location.reload()
            }
        })
    }
})