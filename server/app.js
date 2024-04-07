const express = require("express");
const cors = require('cors');
const app = express();
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const Razorpay = require('razorpay');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set("trust proxy", 1)

app.use(cookieParser());

//route are import here..
const user = require("./routes/userRoutes");
const chat = require("./routes/chatRoutes");
const message = require("./routes/messageRoutes");

app.use("/api/v1/user/", user);
app.use("/api/v1/chat/", chat);
app.use("/api/v1/message/", message);

app.get("/", (req, res)=>{
  res.status(200).json({success : true, message : "server is running ..."})
})

// socket implementation---------->
const server = http.createServer(app); // Add this
const { Server } = require('socket.io');
// Add this
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('chat-message', (message) => {
      console.log('Received message:', message);

      // Broadcast the message to all connected clients
      io.emit('chat-message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
  });
});




module.exports = app;
