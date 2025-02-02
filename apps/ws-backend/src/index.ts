import { WebSocketServer } from "ws";

import { JWT_SECRET } from '@repo/backend-common/config';


const wss = new WebSocketServer({port:8080})

wss.on('connection', function connection(ws){
    ws.on('message', function message(data){
        ws.send('pong')
    })
})