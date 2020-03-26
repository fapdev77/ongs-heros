const connection = require('../database/connection');
// modulo crypto ja disponivel no node para gerarmos um id aleatorio
const crypto = require('crypto');

module.exports = {
  //função para listar todas as Ongs.
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    console.log(ongs);
    return response.json(ongs);
  },
  //
  //funcao para criar um novo registro na tabela
  async create(request, response) {
    //Receber os dados do corpo da nossa requisição
    //const data = request.body; se pegar tudo pode ser que venham dados
    //não necessários, então fazemos a desestruturação dos dados quando
    //receber os request
    
    //recebendo os dados desestruturando, facilita identificar o que
    //estamos recebendo
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    console.log(id);
    console.log(request.body);
    
    //Resposta enviada para quem fez o request.
    return response.json({ id });
    }
};