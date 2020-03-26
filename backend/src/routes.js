const express = require('express');

const OngController = require('./crontrollers/OngController');
const IncidentController = require('./crontrollers/IncidentController');
const ProfileController = require('./crontrollers/ProfileController');
const SessionController = require('./crontrollers/SessionController');

const routes = express.Router();

routes.post('/sessions',SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile',ProfileController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
//para fazer o delete devemos usar um params que é passado com o '/:<nome do param>'
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;