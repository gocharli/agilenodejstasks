const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require('dotenv').config();


// Init Middleware
app.use(express.json());

// Define Routes for API Calls
app.use('/test', require('./routes/test'))



const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
