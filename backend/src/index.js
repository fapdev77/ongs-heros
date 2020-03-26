// Inportar o express como express na aplicação
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
// Importar as funcoes do express dentro da constante app
const app = express();

app.use(cors());
// usa json em todas as requisições recebidas
app.use(express.json());
app.use(routes);


// Escutar na porta 3333 as requisições
app.listen(3333);
