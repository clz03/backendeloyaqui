const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://eloyaqui:a2s3d4@eloyaquidb-ynayq.mongodb.net/eloyaquidb1?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

server.use(express.json());
server.use(routes);

const porta = process.env.PORT || 8080;
server.listen(porta);