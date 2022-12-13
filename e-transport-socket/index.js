
const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;
const online = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('message', (message) => {
    const members = JSON.parse(message.members);
    const receiver = members[0] == message.user_id ? members[1] : members[0]
    const event = `message${message.user_id}${receiver}`;
    io.emit(event, message);
  });

  socket.on('conversation', (receiver) => {
    io.emit(`conversation${receiver}`, receiver);
  });

  socket.on('notification', (notification) => {
    io.emit(`notification-${notification.user_id}`, notification);
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

});

// httpServer.listen(port,  () => console.log(`listening on port ${port}`));
httpServer.listen(port, '192.168.1.226',  () => console.log(`listening on port ${port}`));