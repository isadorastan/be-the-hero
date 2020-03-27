const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/SessionController');

routes.post('/session', sessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create)

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create)
routes.get('/incidents/:id', incidentController.delete)

routes.get('/profile', profileController.index);

module.exports = routes;
