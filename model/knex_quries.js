const knex = require('./database_connection')

let post_data = (details) => {
    return knex('users_Table').insert(details)
}

let updata_data = (details,role_id)=> {
    return knex('users_Table').update({"role_name":details.role_name})
    .where('users_Table.role_id',role_id)
}

let data_post_in_table = (all_details)=>{
    return knex('user_details').insert(all_details)
}

let varify_email = (email) =>{
    return knex.select('*').from('user_details').havingIn('user_details.email',email)
};

let varify_password = (password) => {
    return knex.select('password').from('user_details').havingIn('user_details.password',password)
}

let post_loan_details =(loan_details)=>{
    return knex('Loan_details').insert(loan_details)

}

let update_data =(loan_details,user_id)=>{
    return knex('Loan_details').update({"duration":Loan_details.duration,"stages":Loan_details.stages})
    .where('Loan_details.user_id',user_id)

}

let get_loan_deatils =(user_id)=>{
    return knex.select ("*").from("Loan_details").where('user_id',user_id)
}
module.exports ={post_data,updata_data,data_post_in_table,varify_email,
    varify_password,post_loan_details,update_data,get_loan_deatils}
