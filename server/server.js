import { createServer } from 'node:http';
import { Server } from "socket.io";
import express from 'express';

const ROOM='group'
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:'*',
    }
});
const port = process.env.PORT || 4600;
io.on('connection', (socket) => {
  //console.log('a user connected',socket.id);

  socket.on('joinRoom',async (username)=>{
    //console.log(`${username} is joining the chat.`);
    await socket.join(ROOM);
    //for sending all members of room includes joiner
   // io.to(ROOM).emit('roomNotice',username)
    //broadcasting-sending all except joiner
    socket.to(ROOM).emit('roomNotice',username)
  })
  socket.on('chatMessage',(msg)=>{
     socket.to(ROOM).emit('chatMessage',msg)
  })
  socket.on('typing',(username)=>{
    socket.to(ROOM).emit('typing',username)
  })
  socket.on('stopTyping',(username)=>{
    socket.to(ROOM).emit('stopTyping',username)    
  })
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
