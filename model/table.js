var knex = require('../model/database_connection')

// knex.schema.hasTable("users_Table").then((exists)=>{
//     if (!exists){
//         return knex.schema.createTable("users_Table",(table)=>{
//             table.increments('role_id' ),
//             table.string('role_name')
//         })
//     .catch((err)=>{
//         console.log(err)
//         })
//     }
//     return console.log("users_Table has created")
// })

// knex.schema.hasTable("user_details").then((exists)=>{
//     if (!exists){
//         return knex.schema.createTable("user_details",(table)=>{
//             table.integer('role_id').unsigned()
//             table.foreign('role_id').references('users_Table.role_id'),
//             table.increments('user_id'),
//             table.string('username'),
//             table.string('email'),
//             table.string('password'),
//             table.string('phone_number')
//         })
//     .catch((err)=>{
//         console.log(err)
//         })
//     }
//     return console.log("user_details has created")
// })

knex.schema.hasTable("Loan_details").then((exists)=>{
    if (!exists){
        return knex.schema.createTable("Loan_details",(table)=>{
            table.increments('user_id'),
            table.integer('loan_money'),
            table.string('duration'),
            table.string('intrest_rates'),
            table.string('phone_number'),
            table.string('date_of_creation'),
            table.string('stages'),
            table.integer('agent_id')
        })
    .catch((err)=>{
        console.log(err)
        })
    }
    return console.log("user_details has created")

    
})