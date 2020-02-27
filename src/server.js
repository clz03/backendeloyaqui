const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

// mongoose.connect(process.env.DATABASE_URI, {
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// });

mongoose.connect('mongodb+srv://eloyaqui:a2s3d4@eloyaquidb-ynayq.mongodb.net/eloyaquidb1?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

const porta = process.env.PORT || 8080;
server.listen(porta);