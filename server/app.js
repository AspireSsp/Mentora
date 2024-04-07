const express = require("express");
const cors = require('cors');
const app = express();
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const Razorpay = require('razorpay');

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'PATCH','DELETE', 'HEAD'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set("trust proxy", 1)

app.use(cookieParser());

//route are import here..
const user = require("./routes/userRoutes");

app.use("/api/v1/user/", user);

app.get("/", (req, res)=>{
  res.status(200).json({success : true, message : "server is running ..."})
})

// socket implementation---------->
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from clients
  socket.on('chat message', (message) => {
    console.log('Message received: ', message);
    
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


module.exports = app;
