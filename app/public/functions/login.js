loginForm = document.getElementById('loginForm')
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let login = document.getElementById("login");
  let senha = document.getElementById("senha");

  if (login.value == "" || senha.value == "") {
    alert("Insira um usuario e uma senha");
    location.reload()
  } else {

    fetch('http://localhost:80/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login: login.value, senha: senha.value })
    }).then(
      async function (resposta) {
        a = await resposta.json()
        console.log(a)
        if (a.status == 'sucesso'){
          if (a.admin == false){
            location.href = 'pages/chamado'
          }else {
            location.href = 'pages/gestao'
          }
        }
        else{alert('Login ou senha incorretos')}
      }
    )
  }
});

