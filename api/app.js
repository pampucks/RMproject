const express = require("express");
const app = express();

require('dotenv').config();

// cors
const cors = require("cors");
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db config
const {Connection } = require('./services/db');
Connection;

// routes
const router = require('./routes');
app.use('/api', router);

// error handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);


// server
const PORT = Number(process.env.PORT) || 2025;
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));