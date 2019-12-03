const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

/* mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}); */

mongoose.connect('mongodb+srv://eloyaqui:a2s3d4@eloyaquidb-ynayq.mongodb.net/eloyaquidb1?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

const porta = process.env.PORT || 8080;
server.listen(porta);