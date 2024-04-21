import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { CONFIG } from '../src/config/index.js';
import { timeStamp } from 'console';
import { Client } from '@elastic/elasticsearch';

const app = express();

app.use(cors());
const http =  httpServer.createServer(app);

http.listen(3000, () => {
    console.log('listening on *:3000');
});

const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const esClient = new Client({ node: CONFIG.ES_HOST });

app.get('/', (req, res) => {
    res.send('Hello World!')
});

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('message', (data) => {
        console.log(data);
        esClient.index({
            index: "chatbot_messages",
            document: {
                timestamp: Date.now(),
                message: data
            }
        }).then(response => console.log(response))
            .catch((err) => console.log(err))
        io.emit('newMessage', data);
    })
    io.emit('new connection', 'new connection');
});
