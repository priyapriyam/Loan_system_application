const express = require('express')
let app = express ();
app.use(express.json());

var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');


require('./routes/apis')(app,jwt,passwordHash)

app.listen(8000,()=>{
    console.log("connection done with server 8000")
})