const knex = require('../model/knex_quries')

module.exports = (app, jwt, passwordHash) => {
    app.post('/post_data/', (req, res) => {
        // var role_id = req.params.role_id
        let details = {
            role_name: req.body.role_name
        }
        knex.post_data(details)
            .then((result) => {
                res.send(result)
                console.log("data_inserted")
            })
            .catch((err) => {
                res.send(err)
                console.log(err)
            })
    })
    app.put('/update_data/:role_id', (req, res) => {
        var role_id = req.params.role_id
        let details = {
            role_name: req.body.role_name
        }
        knex.updata_data(details, role_id)
            .then((result) => {
                res.send(result)
                console.log(result)
            })
            .catch((err) => {
                res.send(err)
            })
    })
    app.post('/new_user', (req, res) => {
        var hashedPassword = passwordHash.generate(req.body.password)
        let all_details = {
            role_id: 1,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone_number: req.body.phone_number
        }
        // var hashedPassword = passwordHash.generate(req.body.password)
        // console.log(hashedPassword);

        knex.data_post_in_table(all_details)
            .then((result) => {
                res.send(result),
                    console.log(result)
            })
            .catch((err) => {
                res.send(err)
                console.log(err)
            })
    })
    app.post('/users_login', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        knex.varify_email(email)
            .then((result) => {
                if (result.length != 0) {
                    var hashedPassword = result[0]['password'];
                    var varify_password = passwordHash.verify(password, hashedPassword);
                    if (varify_password == true) {
                        var token = jwt.sign({ "token": result[0].role_id }, 'mishra');
                        res.cookie(token)
                        res.send('login...success')
                    }
                    else {
                        res.send('wrong password')
                        console.log('wrong password');
                    }

                }

                else {
                    res.send('wrong email')
                    console.log("wrong email")
                }
            })
            .catch((err) => {
                res.send(err)
                console.log(err)
            })

    })
    app.post('/loanRequest/:role_id', (req, res) => {
        let role_id = req.params.role_id;
        var token = req.headers.cookie.split(" ")
        token = (token[token.length - 1]).slice(0, -10)
        // console.log(token);
        jwt.verify(token, 'mishra', (err, result) => {
            // console.log(result)
            if (result['token'] == 1) {
                let loan_details = {
                    loan_money: req.body.loan_money,
                    duration: req.body.duration,
                    intrest_rates: req.body.intrest_rates,
                    phone_number: req.body.phone_number,
                    date_of_creation: new Date(),
                    stages: "New",
                    agent_id: req.body.agent_id
                }
                knex.post_loan_details(loan_details)
                    .then((Data) => {
                        res.send(Data)
                        console.log("successfully done")
                    }).catch((err) => {
                        res.send(err)
                        console.log(err)
                    })

            }
            else {
                console.log("your request can't be accepted,you are not an agent")
            }
        })
    })
    app.put('/ApprovalLoanRequest/:user_id', (req, res) => {
        user_id = req.params.user_id
        var token = req.headers.cookie.split(" ")
        // console.log (token)
        token = (token[token.length - 1]).slice(0, -10)
        jwt.verify(token, 'mishra', (err, result) => {
            // console.log(result)
            if (result['token'] == 2) {
                let loan_details = {
                    stages: req.body.stages,
                    
                }
                knex.update_data(loan_details, user_id)
                    .then((result) => {
                        res.send(result)
                        console.log(result)
                    })
                    .catch((err) => {
                        res.send(err)
                        console.log(err)
                    })
            }
            else {
                console.log("you can't do this only admin can do,")
            }
        })
    })
    app.get('/getloanDetails/:user_id',(req,res)=>{
        var user_id = req.params.user_id
        knex.get_loan_deatils(user_id )
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err)
        })
    })
    app.put('/EdittheLoan/:user_id',(req,res)=>{
        var user_id = req.params.user_id
        knex.get_loan_deatils(user_id )
        .then((result)=>{
            res.send(result)
            if (result["stages"] == "New"){
                loan_details = {
                    stages: req.body.stages
                }
            }
            else {
                console.log("you can't edit the loan,your loan has been appoved")
            }
        })
    
        .catch((err)=>{
            res.send(err)
            console.log(err)
        })

    })
}
//     app.get('/viewtheloanDetails,'(req,res)

//     })

// })




