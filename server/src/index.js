import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { getMessageService } from './services/index.js';

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

const messageService = getMessageService();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('message', (data) => {
        const { message } = data;
        console.log(data);
        const isQuestion = messageService.isQuestion(message);
        console.log(isQuestion);
        messageService.saveMessage(message).catch((err) => console.log(err));
        if (isQuestion) {
            messageService.searchAnswer(message).then(answer => {
                console.log(answer);
                if (answer) {
                    io.emit('newMessage', { user: 'Bot', message: answer });
                }
            }).catch((err) => console.log(err))
        }
        io.emit('newMessage', data);
    })
    io.emit('new connection', 'new connection');
});
