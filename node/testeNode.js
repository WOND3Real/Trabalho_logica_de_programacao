
//modulos de conexção
const express = require('express');
const app = express();
const port = 1010;
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

// Rota GET para exibir o formulário de login
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/html/html/loginProvisorio.html');
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
    if (!nome) {
        res.send('Acesso não autorizado!');
        return;
    }
    res.sendFile(__dirname + '/html/html/telaUsuario.html')
    const query = 'SELECT id,nome,cpf,senha,nascimento,sexo FROM credenciais_clientes WHERE nome = ?';
    connection.query(query, [nome], (err, results) => {
        if (err) throw err;
                let html = '<h1>Lista de Usuários</h1>';
        if (results.length > 0) {
            results.forEach((usuario) => {
                html += `<p class="texto">ID: ${usuario.id}</p>`;
                html += `<p class="texto">Nome: ${usuario.nome}</p>`;
                html += `<p class="texto">CPF: ${usuario.cpf}</p>`;
                html += `<p class="texto">Senha: ${usuario.senha}</p>`;
                const dataNascimento = new Date(usuario.nascimento);
                const dataFormatada = `${dataNascimento.getDate()} de ${getNomeMes(dataNascimento.getMonth())} de ${dataNascimento.getFullYear()}`;
                html += `<p>Data de Nascimento: ${dataFormatada}</p>`;
                html += `<p>Sexo: ${usuario.sexo}</p>`;
                html += '<hr>';
            });
        } else {
            html += '<p>Nenhum usuário encontrado.</p>';
        }
         res.send(html);
     });
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