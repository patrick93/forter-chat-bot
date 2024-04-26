import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { getBotService, getMessageService } from './services/index.js';
import { SOCKET_CHANNEL } from './constants.js';

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
const botService = getBotService(io);

io.on(SOCKET_CHANNEL.CONNECTION, (socket) => {
    socket.on(SOCKET_CHANNEL.MESSAGE, (data) => {
        const { message } = data;
        console.log(data);
        messageService.saveMessage(message).catch((err) => console.log(err));
        botService.processMessage(message).catch((err) => console.log(err));
        io.emit(SOCKET_CHANNEL.NEW_MESSAGE, data);
    });
});
