# Sistema para Gestão de Chamados de TI | C TICKET

💼 O sistema utiliza NodeJS e Javascript como suas tecnologias.
As dependências utilizadas no projeto são as seguintes:
mySQL
express
express-session
exceljs
formidable
moment
mysql2 
sequelize
 
🎓 Esta aplicação é visualmente simples e funciona da seguinte maneira:
Existem dois tipos de usuarios: administradores e usuários comuns e cada um deles precisa ter um setor definido para que a coisa funcione de acordo.

Usuários podem apenas abrir chamados, ao realizar o login eles serão direcionados para uma tela de chamados e lá poderão abrir seus chamados e acrescentar uma imagem ao chamado.
Os administradores, por sua vez, poderão acessar abas de gestão onde podem abrir chamados (também), tratar os chamados, observar o dashboard e além disso gerar relatórios de chamados.

🤖 Instalação
É necessário que na máquina onde o sistema irá rodar tenha instalado o NodeJS e além disso é necessário criar um banco chamado "cticket" no mysql (pode ser trocado por você, mas lembre-se de trocar a dependência e a configuração do sequelize na pasta /models/Banco.js) e a aplicação usará a biblioteca sequelize para criar um usuário padrão cujo login e senha são admin. A partir dele você poderá criar os outros usuários e gerir a plataforma.

👀Imagens das telas
https://ibb.co/pbf2Nmz
https://ibb.co/rk917RM
https://ibb.co/p3mzPbW
https://ibb.co/s9wdYTt
https://ibb.co/kyFhDFt
https://ibb.co/GVzLjZ1


🤠 Espero que possa fazer bom uso da aplicação.



