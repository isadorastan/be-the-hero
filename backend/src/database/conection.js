const knex = require('Knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;