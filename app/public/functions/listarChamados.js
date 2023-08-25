async function listarChamados() {
    fetch('http://localhost:80/api/chamado', {
        method: 'GET'
    }).then(async function (resultado) {
        aux = await resultado.json()
        if (aux.status == 'sucesso') {
            chamados = aux.chamados
            chamados.forEach(chamado => {

                const div1 = document.createElement('div')
                div1.id = `div1${chamado.id}`
                div1.classList.add('col-lg-3')
                div1.classList.add('d-flex')
                div1.classList.add('mb-2')
                div1.classList.add('align-items-stretch')
                document.getElementById('cartoes').appendChild(div1);

                const div2 = document.createElement('div')
                div2.id = `div2${chamado.id}`
                div2.classList.add('card');
                div2.style = 'width: 18rem; display: inline-block;'
                document.getElementById(`div1${chamado.id}`).appendChild(div2);

                const p = document.createElement('p')
                p.style = 'margin-top: 7.2rem; margin-left: 1.5rem; position: absolute; font-size: 14px;'
                p.innerHTML = `<b>${chamado.autor.toString().toUpperCase()}</b>`
                document.getElementById(`div2${chamado.id}`).appendChild(p);

                const p3 = document.createElement('p')
                p3.style = 'margin-top: 1rem; margin-left: 1.0rem; position: absolute;'
                p3.innerHTML = `#<b>${chamado.id}</b>`
                document.getElementById(`div2${chamado.id}`).appendChild(p3);

                const img = document.createElement('img')
                img.classList.add('card-img-top')
                img.style = 'height: 150px;'
                img.src = './../img/suaimagem.png'
                document.getElementById(`div2${chamado.id}`).appendChild(img);

                const div3 = document.createElement('div')
                div3.id = `div3${chamado.id}`
                div3.classList.add('card-body')
                document.getElementById(`div2${chamado.id}`).appendChild(div3);

                const h5 = document.createElement('h5')
                h5.classList.add('card-title')
                h5.textContent = chamado.titulo.toString().toUpperCase()
                document.getElementById(`div3${chamado.id}`).appendChild(h5)
                const p2 = document.createElement('p')
                p2.classList.add('card-text')
                p2.textContent = chamado.descricao
                document.getElementById(`div3${chamado.id}`).appendChild(p2)
                if (chamado.codigo_imagem) {
                    console.log('ENTREI NA CONDIÇÃO')
                    const botaoImagem = document.createElement('button')
                    console.log(botaoImagem)
                    botaoImagem.id = `btImg${chamado.id}`
                    botaoImagem.classList.add('btn')
                    botaoImagem.classList.add('btn-primary')
                    botaoImagem.textContent = 'Foto'
                  
                    botaoImagem.onclick = async function () {
                        const modalImagem = document.getElementById('imagemDoChamado')

                        //fechar modal
                        aux3 = document.getElementById('fecharImagem')
                        aux3.onclick = async function () {
                            modalImagem.classList.remove('d-block')
                            modalImagem.classList.add('fade')
                        }
                        //abrir modal
                        document.getElementById('idTituloImagem').textContent = chamado.id
                        document.getElementById('urlImagem').src = `http://localhost:80/imagens/${chamado.codigo_imagem}`
                        modalImagem.classList.remove('fade')
                        modalImagem.classList.add('d-block')
                        
                        //url da imagem

                        document.getElementById('idTituloImagem').textContent = chamado.id


                    }
                    document.getElementById(`div3${chamado.id}`).appendChild(botaoImagem)
                }

                a = document.createElement('a')
                a.href = '#';
                a.classList.add('btn')
                a.classList.add('btn-success')
                a.textContent = 'Resolver chamado'
                a.onclick = async function () {
                    //fechar modal
                    aux = document.getElementById('fecharModalSolucao')
                    aux.onclick = async function () {
                        modal.classList.remove('d-block')
                        modal.classList.add('fade')
                    }
                    //abrir modal
                    document.getElementById('idTitulo').textContent = chamado.id
                    modal = document.getElementById('conteudoFecharChamado')
                    modal.classList.remove('fade')
                    modal.classList.add('d-block')

                    //definir evento do form
                    formFecharChamado = document.getElementById('formFecharChamado')
                    formFecharChamado.addEventListener("submit", async (e) => {
                        e.preventDefault();

                        let tipo = document.getElementById("tipo");
                        let descricaoDaSolucao = document.getElementById("descricaoDaSolucao");

                        if (tipo.value == 'n/a' || descricaoDaSolucao.value == "") {
                            alert("Preencha os campos corretamente")
                        }
                        else {
                            await fecharChamado(chamado.id, tipo.value, descricaoDaSolucao.value).then((retorno) => {
                                if (retorno.status = `sucesso`) {
                                    location.reload()
                                }
                                else {
                                    alert('Chamado não foi concluido')
                                }
                            }
                            )
                        }


                    })
                }
                document.getElementById(`div3${chamado.id}`).appendChild(a)

                const ip = document.createElement('span')
                ip.id = `ip${chamado.ip_autor}`
                ip.classList.add('form-control-plaintext')
                ip.textContent = `IP do autor: ${chamado.ip_autor}`
                document.getElementById(`div3${chamado.id}`).appendChild(ip)

            })

        } else {
            alert("Houve um erro ao listar os chamados")
        }
    }
    )
}


async function fecharChamado(id_chamado, tipo, solucao) {
    aux = await fetch('http://localhost:80/api/chamado', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id_chamado: id_chamado, tipo: tipo, solucao: solucao })
    })
    return aux.json()
}

module.exports = { listarChamados, fecharChamado }