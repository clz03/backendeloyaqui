const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

const porta = process.env.PORT || 8080;
server.listen(porta);