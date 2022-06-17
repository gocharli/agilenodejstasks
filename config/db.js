const mysql = require('mysql2/promise');

var con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:  process.env.DB_PASS,
    insecureAuth : true,
    database:  process.env.DB
});

con.on('connection', (stream) => {
    console.log("DB Connected")
})

module.exports = con;
