const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();


mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

server.use(express.json());
server.use(routes);

const porta = process.env.PORT || 8080;
server.listen(porta);