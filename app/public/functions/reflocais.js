function paginaAbrirChamadoAdmin(){
    location.href = 'chamadoadmin'
}

function paginaDashboard(){
    location.href = 'gestao'
}
function paginaListarChamadosAberto(){
    location.href = 'listarchamados'
}
function paginaFiltroChamados(){
    location.href = 'filtrarchamados'
}

function paginaUsuarios(){
    location.href = 'usuarios'
}


function sair(){
    location.href = 'sair'
}


module.exports = {paginaUsuarios, paginaAbrirChamadoAdmin, paginaDashboard, paginaListarChamadosAberto, paginaFiltroChamados, sair}