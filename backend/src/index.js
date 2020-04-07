// Inportar o express como express na aplicação
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 5000;
// Importar as funcoes do express dentro da constante app
const app = express();

app.use(cors());
// usa json em todas as requisições recebidas
app.use(express.json());
app.use(routes);


// Escutar na porta configurada no arquivo .env ou na porta 5000 caso não exista o arquivo de config
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

