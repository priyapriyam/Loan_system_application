var  knex = require ("knex")({
    client: 'mysql',
    connection:{
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "loan_Project"
    }
})
module.exports = (knex)