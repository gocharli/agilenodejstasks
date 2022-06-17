const mysql = require('mysql2/promise');

    var con = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        insecureAuth : true,
        database: 'sys'
    });
    
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("SQL DB Connected!");
    // });


module.exports = con;
