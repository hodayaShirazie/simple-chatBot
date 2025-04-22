require('dotenv').config(); // Load the environment variables

const { Pool } = require("pg");

const pool = new Pool({
    // user: "postgres",
    // password: "1212",
    // host: "localhost" ,
    // port: "5432",
    // database: "chatbot"

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

module.exports = pool;

