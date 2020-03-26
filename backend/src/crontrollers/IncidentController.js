const connection = require('../database/connection');

module.exports = {
  async index(request,response) {

    //pega o valor da variavel pages via query na url enviada
    const {page = 1} = request.query;

    //contar todos os registros da tabela
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*', 
      'ongs.name', 
      'ongs.email', 
      'ongs.whatsapp', 
      'ongs.city', 
      'ongs.uf'
    ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request,response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    //desestruturando o id que sera retornado quando criarmos o registro direto em uma variavel 'id'
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });
    return response.json({ id })
  },

  async delete(request,response) {
    // pegar o id que vem no params que estou passando de forma desestruturada
    const { id } = request.params;
    // pegar o id da ong do header
    const ong_id = request.headers.authorization;

    // criar um sql estruturado para verificar se o id informado pertence
    // a ong_id informado e evitar uso não autorizado por exemplo.
    // basicamente o sql pesquisa no campo id pelo id informado e seleciona a ong_id 
    // relacionada ao id informado.
    try {
    const incident = await connection('incidents')
      .where('id',id)
      .select('ong_id')
      .first();
    
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({error: 'Operation not permitted!'});
    }
    
    await connection('incidents').where('id',id).delete();

    return response.status(204).send();

  } catch (error) {
      return response.status(401).json({error: 'Id não encontrado!'});
  }

  }
};