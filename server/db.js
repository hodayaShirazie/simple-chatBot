// require('dotenv').config(); // Load the environment variables

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "1212",
    host: "localhost" ,
    port: "5432",
    database: "chatbot"
});

module.exports = pool;

