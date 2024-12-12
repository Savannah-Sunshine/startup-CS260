const UserEvent = {
    System: 'system'
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class UserEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            console.log(`socket opened, event: ${event}`);
            console.log(event.toString());
            this.receiveEvent(new EventMessage('A user', UserEvent.System, {
                msg: 'connected'
            }));
        };
        this.socket.onclose = (event) => {
            console.log(`socket closed, event: ${event}`);
            this.receiveEvent(new EventMessage('A user', UserEvent.System, {
                msg: 'disconnected'
            }));
        };
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    }

    broadcastEvent(from, type, value) {

        const sendMessage = () => {
            this.socket.send(JSON.stringify({
                from,
                type,
                value
            }));
        };

        // If the socket is open, send the message
        if (this.socket.readyState === WebSocket.OPEN) {
            sendMessage();
        } else {
            this.socket.addEventListener('open', sendMessage, {
                once: true
            });
        }
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }
}

const UserNotifier = new UserEventNotifier();
export {
    UserEvent,
    UserNotifier
};