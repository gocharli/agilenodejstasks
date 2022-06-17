const express = require('express');
const app = express();
var mysql = require('mysql');
const cors = require("cors");
const { application } = require('express');
app.use(express.json());
app.use(cors());

// Init Middleware
app.use(express.json());

// Define Routes for API Calls
app.use('/test', require('./routes/test'))


// Connect DB
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  insecureAuth : true,
  database: 'sys'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("SQL DB Connected!");
});


// APIs
app.get('/', (req, res) => {
    try {
        con.query("SELECT * FROM tbltask_followers", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
          });
    } catch (error) {
        console.log(error)
    }
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
