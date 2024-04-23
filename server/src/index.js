import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { CONFIG } from '../src/config/index.js';
import { Client } from '@elastic/elasticsearch';
import nlp from 'compromise';

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
        const { message } = data;
        console.log(data);
        const isQuestion = !!nlp(message).sentences().isQuestion().out('array').length;
        console.log(isQuestion);
        esClient.index({
            index: "chatbot_messages",
            document: {
                timestamp: Date.now(),
                message,
                isQuestion
            }
        }).catch((err) => console.log(err));
        if (isQuestion) {
            esClient.search({
                index: "chatbot_messages",
                query: {
                    "bool": {
                        "must": {
                            "match": {
                                "message": {
                                    "query": message
                                }
                            }
                        },
                        "filter": [
                            { 
                                "term": {
                                    "isQuestion": false
                                } 
                            }
                        ]
                    }
                }
            }).then(response => {
                console.log(response);
                if (response.hits.total.value > 0) {
                    io.emit('newMessage', { user: 'Bot', message: response.hits?.hits[0]?._source?.message });
                }
            }).catch((err) => console.log(err))
        }
        io.emit('newMessage', data);
    })
    io.emit('new connection', 'new connection');
});
