async function carregarUsuarios() {
    fetch('http://localhost:80/api/usuarios', {
        method: 'GET',
    }).then(
        async function (resposta) {
            a = await resposta.json()
            if (a.status == 'sucesso') {
                users = a.usuarios;
                users.forEach(usuario => {
                    const tr = document.createElement('tr');
                    tr.id = `dado${usuario.id}`
                    document.getElementById('usuarios').appendChild(tr)

                    const nome = document.createElement('td')
                    const login = document.createElement('td')
                    const admin = document.createElement('td')
                    const setor = document.createElement('td')
                    nome.textContent = usuario.nome
                    login.textContent = usuario.login
	            setor.textContent = usuario.setor
                    const a = document.createElement('a')
                    a.href = '#'
                    a.id = `excluir:${usuario.login}`
                    a.textContent = 'Excluir'
                    a.onclick = async function () {
                        if (confirm(`Deseja excluir o usuário ${usuario.nome} | ${usuario.login}?`)) {
                            fetch('http://localhost:80/api/usuarios', {
                                method: 'DELETE',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ "id": usuario.id })
                            }).then(async function (retorno) {
                                resposta = await retorno.json()
                                if (resposta.status == 'sucesso') {
                                    alert(`Usuário ${usuario.nome} | ${usuario.login} excluido com sucesso!`)
                                    location.reload()
                                }
                                else { alert(`Ocorreu um erro! O usuário não foi excluido. Tente novamente.`) }
                            })
                        }
                    }

                    const a2 = document.createElement('a')
                    a2.href = '#'
                    a2.id = `editarNome:${usuario.login}`
                    a2.textContent = 'Editar Nome'
                    a2.onclick = async function () {
                        if (confirm(`Deseja alterar o nome do usuário ${usuario.nome} | ${usuario.login}?`)) {
                            novoNome = prompt('Insira o novo nome do usuário:')
                            fetch('http://localhost:80/api/usuarios', {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ "id": usuario.id, "nome": novoNome })
                            }).then(async function (retorno) {
                                resposta = await retorno.json()
                                if (resposta.status == 'sucesso') {
                                    alert(`Nome do usuário ${usuario.nome} | ${usuario.login} alterado com sucesso!`)
                                    location.reload()
                                }
                                else { alert(`Ocorreu um erro! O usuário não teve seu nome alterado. Tente novamente.`) }
                            })
                        }
                    }

                    const a3 = document.createElement('a')
                    a3.href = '#'
                    a3.id = `editarSenha:${usuario.login}`
                    a3.textContent = 'Editar Senha'
                    a3.onclick = async function () {
                        if (confirm(`Deseja alterar a senha do usuário ${usuario.nome} | ${usuario.login}?`)) {
                            novaSenha = prompt('Insira a nova senha do usuário:')
                            fetch('http://localhost:80/api/usuarios', {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ "id": usuario.id, "senha": novaSenha })
                            }).then(async function (retorno) {
                                resposta = await retorno.json()
                                if (resposta.status == 'sucesso') {
                                    alert(`Nome do usuário ${usuario.nome} | ${usuario.login} alterado com sucesso!`)
                                    location.reload()
                                }
                                else { alert(`Ocorreu um erro! O usuário não teve seu nome alterado. Tente novamente.`) }
                            })
                        }
                    }
                    const acoes = document.createElement('td')
                    acoes.id = `acoes${usuario.id}`
                    const espaco1 = document.createElement('span')
                    espaco1.textContent = ' | '
                    const espaco2 = document.createElement('span')
                    espaco2.textContent = ' | '
                    if (usuario.admin) {
                        admin.textContent = 'sim'
                    }
                    else {
                        admin.textContent = 'não'
                    }
                    const b = document.createElement('span')
                    document.getElementById(`dado${usuario.id}`).appendChild(nome)
                    document.getElementById(`dado${usuario.id}`).appendChild(login)
                    document.getElementById(`dado${usuario.id}`).appendChild(admin)
                    document.getElementById(`dado${usuario.id}`).appendChild(setor)
                    document.getElementById(`dado${usuario.id}`).appendChild(acoes)
                    document.getElementById(`acoes${usuario.id}`).appendChild(a)
                    document.getElementById(`acoes${usuario.id}`).appendChild(espaco1)
                    document.getElementById(`acoes${usuario.id}`).appendChild(a2)
                    document.getElementById(`acoes${usuario.id}`).appendChild(espaco2)
                    document.getElementById(`acoes${usuario.id}`).appendChild(a3)
                })
            }
            else { alert('errado') }
        }
    )
}


criarNovoUsuario = document.getElementById('formCriacaoUsuario')
criarNovoUsuario.addEventListener("submit", (e) => {
    console.log(e)
    e.preventDefault();

    let nome = document.getElementById("nome");
    let login = document.getElementById("login");
    let senha = document.getElementById("senha");
    let permissao = document.getElementById('permissao')
    let setor = document.getElementById('setor')
    if (permissao.value == "n/a" || setor.value == "n/a" || nome.value == "" || login.value == "" || senha.value == "") {
        alert("Faltam campos a serem preenchidos. Tente novamente.");
        location.reload()
    } else {
        fetch('http://localhost:80/api/usuarios', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: nome.value, login: login.value, senha: senha.value, admin: permissao.value, setor: setor.value })
        }).then(
            async function (resposta) {
                aux = await resposta.json()
                console.log(aux)
                if (a.status == 'sucesso') {
                    alert(`Usuário ${nome.value} | ${login.value} criado com sucesso!`)
                    location.reload()
                }
                else { alert('Falha na criação do usuário') }
            }
        )
    }
});



module.exports = { carregarUsuarios }