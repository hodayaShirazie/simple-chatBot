CREATE DATABASE chatBot;

CREATE TYPE sender_type AS ENUM ('user', 'bot');

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender sender_type NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



    