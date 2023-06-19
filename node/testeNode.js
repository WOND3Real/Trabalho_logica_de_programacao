const express = require('express');
const app = express();
const port = 1010;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path")
const alert = require("alert-node")
//modulos de conexção

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_SMT'
});
// Configuração do banco de dados

connection.connect((err) => {
    if (err) throw err;
    //verificação de erro, se a variavel possuir um valor nela, então ouve erro, senão o codigo funcionará normalmente
    console.log('Conectado ao banco de dados MySQL.');
});
//Feedback da Conexão com o banco de dados

app.use(express.urlencoded({ extended: true }));
// Configurar o middleware para processar os dados do formulário


app.use(express.static(path.join(__dirname,"front")))
//configuração de arquivos estaticos para front end

let nomeUsuario = ''
//Variavél para função de ler nome do login universalmente

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
// Rota para pagina incial

app.get('/pagLogin',function(req, res){
    res.sendFile(__dirname + '/login.html');
});
// Rota GET para exibir o formulário de login

app.post('/login', (req, res) => {
// Rota POST para processar o login do formulário
    const nome = req.body.nomeLogin;
    const senha = req.body.senhaLogin;
    const loginType = req.body.modalidade;
    //variaveis requerindo valores inseridos no corpo do html
    const query = 'SELECT * FROM ' + loginType + ' WHERE nome = ? AND senha = ?';
     //variavél possuindo o comando direcionado ao MySql
    connection.query(query, [nome, senha], (err, results) => {
        //função para verificação de dados no banco de dados
        if (err) throw err;
        //verificação de erro, se a variavel possuir um valor nela, então ouve erro, senão o codigo funcionará normalmente
        if (results.length > 0) {
            // Credenciais corretas
            nomeUsuario = nome;
            // atribui o valor da variavel nome à uma variavel global
            tipoLogin = loginType;
            // atribui o valor da variavel do tipo de login à uma variavel global
            res.redirect('/usuarios');
            // Redireciona para rota contendo as informações dos usúarios
        } else {
            res.send('Nome ou senha inválidos!');
            // Credenciais incorretas
        }
    });
});

app.get('/usuarios', (req, res) => {
// Rota GET para exibir a página com todas as informações do banco de dados
    const nome = nomeUsuario;
    const loginType = tipoLogin;
    //variaveis puxando valores de escopo global para a função em questão
    if (!nome){
    //verifica se a variavel nome é nula ou vazia, se for, finalizará o codigo
        res.send('Acesso não autorizado!');
        return;
    } else {
        const query = 'SELECT id, nome, cpf, senha, nascimento, sexo FROM ' + loginType + ' WHERE nome = ?';
        connection.query(query, [nome], (err, results) => {
        //função para consulta de dados no mysql
            if (err) {
            //verificação de erro, se a variavel possuir um valor nela, então ouve erro, senão o codigo funcionará normalmente
                console.error('Erro ao executar a consulta:', err);
                return;
            }
            if (results.length > 0) {
                //função para imprimir os dados do usuario logado
                const data = results[0];
                //variavel com array contendo dados da tabela mysql
                const dataNascimento = new Date(data.nascimento);
                const dataFormatada = `${dataNascimento.getDate()} de ${getNomeMes(dataNascimento.getMonth())} de ${dataNascimento.getFullYear()}`;
                //mini função para formatar data
                function getNomeMes(mes) {
                    const meses = [
                    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
                    ];
                    return meses[mes];
                }
                //mini função de seleção de meses para formatação de data
                
                //Geração de documento html com dados do usuário
                res.set('Content-Type', 'text/html');
                res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Paciente</title>
                    <style>
                        /* Importação do reset */
                        @import url(./reset.css);
                    /* Fonte padrão */
                    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap');
                
                    * {
                        font-family: 'Raleway', sans-serif;
                    }
                
                    /* Cores Padrão */
                    :root {
                        --bg-purple: #7824A6;
                        --bg-orange: #F69025;
                        --bg-orangelight: #FAD08D;
                    }
                
                    /* -Header- */
                
                    /* fundo laranja */
                    .header {
                        background-color: rgba(246, 144, 37, 0.7);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                
                    /* fundo branco */
                    #header {
                        margin-top: 60px;
                        margin-bottom: 60px;
                        background-color: #fff;
                        width: calc(100% - 200px);
                        height: auto;
                        border: 5px solid #FAD08D;
                        border-radius: 48px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                    }
                
                    /* centralização do conteudo */
                    #container--header {
                        max-width: 900px;
                        margin: auto;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        display: flex;
                        gap: 10px;
                    }
                
                    /* mudando tamanho da img */
                    .profile--header img {
                        width: 132px;
                        height: 139px;
                        border-radius: 80px;
                        margin-top: 20px;
                    }
                
                    .line--logged {
                        margin-top: 10px;
                        height: 5px;
                        background-color: var(--bg-orangelight);
                        width: 100%;
                    }
                
                    /* dados dos pacientes */
                    .datapeople--header {
                        display: grid;
                        margin-top: 60px;
                        margin-left: 80px;
                        grid-gap: 20px;
                        max-height: 30px;
                    }
                
                    .datapeople--header div {
                        max-height: 30px;
                    }
                
                    .datapeople--header div:nth-child(1) {
                        grid-area: nome;
                    }
                
                    .containerdata--table {
                        font-weight: 600;
                        font-size: 20px;
                        color: #000000;
                    }
                
                    /* tabela */
                    table {
                        border-radius: 40px;
                    }
                
                    table, th, td {
                        margin: 40px;
                        border: 5px solid var(--bg-orangelight);
                        border-collapse: collapse;
                        padding: 5px 10px 5px 10px;
                    }
                
                    table tr th {
                        background-color: #FAD08D;
                    }
                
                    table tr td {
                        font-weight: 500;
                    }
                </style>
                </head>
                <body>
                    <header class="header">
                        <header id="header">
                            <div id="container--header">
                                <div class="profile--header"><img src="/image/Perfil.jpg" alt=""></div>
                                <div class="datapeople--header">
                                    <div class="containerdata--table">
                                        <tr>
                                            <th>ID:</th>
                                            <td id="infId">${data.id}</td>
                                        </tr>
                                    </div>
                                    <div class="containerdata--table">
                                        <tr>
                                            <th>Nome:</th>
                                            <td id="infNome">${data.nome}</td>
                                        </tr>
                                    </div>
                                    <div class="containerdata--table">
                                        <tr>
                                            <th>CPF:</th>
                                            <td id="infCpf">${data.cpf}</td>
                                        </tr>
                                    </div>
                                    <div class="containerdata--table">
                                        <tr>
                                            <th>Senha:</th>
                                            <td id="infSen">${data.senha}</td>
                                        </tr>
                                    </div>
                                    <div class="containerdata--table">
                                        <tr>
                                            <th>Nascimento:</th>
                                            <td id="infNasci">${dataFormatada}</td>
                                        </tr>
                                    </div>
                                    <div class="containerdata--table">
                                        <tr>
                                            <th>Sexo:</th>
                                            <td id="infSex">${data.sexo}</td>
                                        </tr>
                                    </div>
                                </div>
                            </div>
                            <div class="line--logged"></div>
                            <aside>
                                <table>
                                    <tr>
                                        <th>Medico</th>
                                        <th>Datas/Horários</th>
                                        <th>Especialidade</th>
                                        <th>Consultório</th>
                                        <th>Exame</th>
                                        <th>Status</th>
                                    </tr>
                                    <tr>
                                        <td>Hailee Cortez</td>
                                        <td>12/06 - 14h</td>
                                        <td>Urologia</td>
                                        <td>Urolo-08</td>
                                        <td>Endoscopia</td>
                                        <td>Exame Realizado</td>
                                    </tr>
                                    <tr>
                                        <td>Iury Cortez</td>
                                        <td>28/06 - 18h</td>
                                        <td>Oftalmologia</td>
                                        <td>Oftal-15</td>
                                        <td>Fundoscopia</td>
                                        <td>Realizar</td>
                                    </tr>
                                </table>
                            </aside>
                        </header>
                    </header>
                </body>
                </html>
                `);
            } else {
                res.send('Nenhum usuário encontrado.');
            }
        });
    }
});
//Geração de documento html com dados do usuário

app.get('/paginaRegistro', function(req, res) {
    res.sendFile(__dirname + '/cadastro.html');
});
//Rota da tela de registro

app.post('/registro', (req, res) =>{
    //função post para registrar usuários no banco de dados
    const idReg = "default"
    const nomeReg = req.body.registroNome;
    const cpfReg = req.body.registroCpf;
    const senhaReg = req.body.registroSenha;
    const dataReg = req.body.registroNascimento;
    const sexoReg = req.body.registroSexo;
    //variaveis requerindo as informações inseridas no formulário
    const query = 'INSERT INTO credenciais_clientes (id,nome,cpf,senha,nascimento,sexo) VALUES (?, ?, ?, ?, ?, ?)';
    //variavél contendo o contendo a inserção de informações do formulário de registro
    connection.query(query, [idReg, nomeReg, cpfReg, senhaReg, dataReg, sexoReg], (err, results) => {
        if (err) throw err;
        //verificação de erro, se a variavel possuir um valor nela, então ouve erro, senão o codigo funcionará normalmente
        alert('Dados adicionados com sucesso!')
        //alerta com feedback da ocorrencia
        res.redirect('/')
        //redirecionamento para tela inicial
    });
});

//Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
//sempre no final do codigo