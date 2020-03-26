const knex = require('knex');

// apontamos para o arquivo de configuracao do knex.
const configuration = require('../../knexfile');

//criar a conexao com o database que ja configuramos no knexfile
// database development
const connection = knex(configuration.development);

//exportando nosso modulo connection para ser utilizado
module.exports = connection;