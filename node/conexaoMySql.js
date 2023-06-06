//Modulo expresss
const app = require('express')
//Modulo MySql
const mysql = require("mysql")
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'sistema_SMT'
})
//Feedback de conexão
connection.connect((err) => {
if (err) {
console.error('Erro ao conectar ao banco de dados:', err)
return;
}
console.log('Conexão estabelecida com sucesso!')
})
//abertura do servidor sempre no final
app.listen(1010)

