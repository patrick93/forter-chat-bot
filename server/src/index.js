import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

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

app.get('/', (req, res) => {
    res.send('Hello World!')
});

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('message', (data) => {
        console.log(data);
        io.emit('newMessage', data);
    })
    io.emit('new connection', 'new connection');
});
