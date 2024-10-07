const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"]
  }
});

// Object to hold rooms and their users
const rooms = {};

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Listen for room join requests
  socket.on('join_room', ({ roomCode, name, avt }) => {
    socket.join(roomCode);
    if (!rooms[roomCode]) {
      rooms[roomCode] = [];
    }
    rooms[roomCode].push(socket.id);
    console.log(`User ${socket.id} joined room: ${roomCode}`);
  });

  // Listen for messages from the client
  socket.on('send_message', ({ roomCode, message, avt, name }) => {
    console.log(`Message received in room ${roomCode}: `, message);
    
    const messageData = {
      message,
      name,
      avt
    };

    // Broadcast the message to the specific room
    io.to(roomCode).emit('receive_message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    
    // Remove the user from their rooms
    for (const room in rooms) {
      if (rooms[room].includes(socket.id)) {
        rooms[room] = rooms[room].filter(id => id !== socket.id);
        console.log(`User ${socket.id} removed from room: ${room}`);
        break; // Exit after removing the user from their room
      }
    }
  });
});

// Start the server
server.listen(5000, () => {
  console.log('Server listening on port 5000');
});
