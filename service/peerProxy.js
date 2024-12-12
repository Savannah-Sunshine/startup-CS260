const {
    WebSocketServer
} = require('ws');
const uuid = require('uuid');

// This uses websockets! It's better than HTTP, it keeps the connection alive

function peerProxy(httpServer) {
    // Create a websocket object
    const wss = new WebSocketServer({
        noServer: true
    });

    // Handle the protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    // Keep track of all the connections so we can forward messages
    let connections = [];
    // let onlineUsers = [];

    wss.on('connection', (ws) => {
        const connection = {
            id: uuid.v4(),
            alive: true,
            ws: ws
        };
        // const onlineUser = {
        //     id: connection.id,
        //     name: 'Anonymous'
        // };
        connections.push(connection);
        // onlineUsers.push(onlineUser);

        // Forward messages to everyone except the sender
        ws.on('message', function message(data) {
            connections.forEach((c) => {
                if (c.id !== connection.id) {
                    c.ws.send(data);
                }
            });
        });

        // Remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);
            // const userPos = onlineUsers.findIndex((o, i) => o.id === connection.id);

            if (pos >= 0) {
                connections.splice(pos, 1);
            }
            // if (userPos >= 0) {
            //     onlineUsers.splice(userPos, 1);
            // }
        });

        // Respond to pong messages by marking the connection alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    // Keep active connections alive
    setInterval(() => {
        connections.forEach((c) => {
            // Kill any connection that didn't respond to the ping last time
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}

module.exports = {
    peerProxy
};