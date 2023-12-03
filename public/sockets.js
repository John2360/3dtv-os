const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const cors = require('cors');

io.on('connection', (socket) => {
  console.log('A client connected');

  // Listen for custom events from the client
  socket.on('playbackConfig', (config) => {
    console.log('Received playbackConfig:', config);

    // Broadcast the message to all connected clients
    io.emit('playbackConfig', config);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Playback server listening on port ${port}`);
});