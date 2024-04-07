const app = require('./app');
require("dotenv").config();
const connectDB = require('./config/DbConnection');
const Message = require('./models/messageModel');


connectDB()
const port = process.env.PORT || 5000 ;


const server =  app.listen(port, ()=>{
    console.log(`server is running on port  ${port}`);
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io", socket.id);
    socket.on("setup", (userData) => {
      socket.join(userData?._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", async(newMessageRecieved) => {
        const newmsg = await Message.create(newMessageRecieved);
        socket.emit("message-response", newmsg )
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData?._id);
    });
  });


