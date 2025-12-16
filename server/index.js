const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // Allow all for now, in prod restrict to client URL
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-session', (sessionId) => {
        socket.join(sessionId);
        console.log(`Socket ${socket.id} joined session ${sessionId}`);
    });

    socket.on('code-update', ({ sessionId, code }) => {
        // Broadcast to everyone else in the room
        socket.to(sessionId).emit('code-update', code);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
