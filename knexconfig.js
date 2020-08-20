const knex = require("knex")
const knexfile = require("./knexfile")
const knexconfig = knex(knexfile.production)

module.exports = knexconfig