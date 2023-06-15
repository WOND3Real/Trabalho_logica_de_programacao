
//modulos de conexção
const express = require('express');
const app = express();
const port = 1010;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const $ = require('jquery');
const { JSDOM } = require('jsdom');

//Variavél para ler função de ler nome do login
let nomeUsuario = ''

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_SMT'
});

// Conexão com o banco de dados
connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL.');
});

// Configurar o middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: true }));

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para pagina incial
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Rota GET para exibir o formulário de login
app.get('/pagLogin',function(req, res){
    res.sendFile(__dirname + '/login.html');
});



// Rota POST para processar o login
app.post('/login', (req, res) => {
    const nome = req.body.nomeLogin;
    const senha = req.body.senhaLogin;
    const loginType = req.body.modalidade;
    const query = 'SELECT * FROM ' + loginType + ' WHERE nome = ? AND senha = ?';
    connection.query(query, [nome, senha], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            // Credenciais corretas
            nomeUsuario = nome;
            tipoLogin = loginType;
            res.redirect('/usuarios');
        } else {
            // Credenciais incorretas
            res.send('Nome ou senha inválidos!');
        }
    });
});



// Rota GET para exibir a página com todas as informações do banco de dados
app.get('/usuarios', (req, res) => {
    const nome = nomeUsuario;
    const loginType = tipoLogin
    if (!nome) {
        res.send('Acesso não autorizado!');
        return;
    }
    res.sendFile(__dirname + '/conta.html')
    const query = 'SELECT id,nome,cpf,senha,nascimento,sexo FROM ' + loginType + ' WHERE nome = ' + "'" + nome + "'";
    connection.query(query, [nome], (err, results) => {
        
        fs.readFile(__dirname + '/conta.html', 'utf8', (error, html) => {
            if (error) {
              console.error('Ocorreu um erro ao ler o arquivo:', error);
              return;
            }
            connection.query(query, (error, results) => {
                if (error) {
                  console.error('Erro ao executar a consulta:', error);
                  return;
                }
              
                if (results.length > 0) {
                    const nome = results[0].nome; // Substitua "nome" pelo nome da coluna que contém o nome no seu banco de dados
                
                    // Atualizar o conteúdo do elemento <tr> com ID "batata"
                    const trElementId = 'infNome';
                    const trContent = `<td>${nome}</td>`; // Construa o novo conteúdo do elemento <tr>
                    res.send(trContent)
                    // Aqui você deve usar alguma lógica para substituir o conteúdo do elemento <tr> no seu arquivo HTML.
                    // Você pode ler o conteúdo do arquivo, encontrar o elemento <tr> com o ID "batata" usando manipulação de strings
                    // e substituir o conteúdo encontrado pelo novo conteúdo gerado.
                    // Após a substituição, salve o arquivo HTML atualizado.
                
                    console.log(`Conteúdo atualizado para o elemento <tr> com ID "${trElementId}"`);
                }
            })
        })
    })
});

//mini função para formatação de data
function getNomeMes(mes) {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return meses[mes];
}



//tela de registro
app.get('/paginaRegistro', function(req, res) {
    res.sendFile(__dirname + '/html/html/telaRegistro.html');
});

// Rota POST para processar o login
app.post('/registro', (req, res) =>{
    const idReg = "default"
    const nomeReg = req.body.registroNome;
    const cpfReg = req.body.registroCpf;
    const senhaReg = req.body.registroSenha;
    const dataReg = req.body.registroNascimento;
    const sexoReg = req.body.registroSexo;
    
    const query = 'INSERT INTO credenciais_clientes (id,nome,cpf,senha,nascimento,sexo) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [idReg, nomeReg, cpfReg, senhaReg, dataReg, sexoReg], (err, results) => {
        if (err) throw err;
        res.send('Dados adicionados com sucesso!');
    });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});