const app = require('./app');
require("dotenv").config();
const connectDB = require('./config/DbConnection');





const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const server = http.createServer(app);
const io = socketIo(server);


connectDB()
const port = process.env.PORT ;
// Enable CORS for all origins and allow specified methods
app.use(cors({
  origin: '*', // Allow requests from the client running on port 3000
  methods: ['GET', 'POST'], // Allow specified HTTP methods
  credentials: true, // Allow credentials (e.g., cookies) to be sent with requests
}));

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle 'send name' event
  socket.on('send name', (user) => {
    io.emit('send name', user); // Broadcast the 'send name' event to all connected clients
  });

  // Handle 'send message' event
  socket.on('send message', (chat) => {
    io.emit('send message', chat); // Broadcast the 'send message' event to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


