
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
    io.emit('message', message);
  });

  socket.on('notification', (notification) => {
    io.emit(`notification-${notification.user_id}`, notification);
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

});

httpServer.listen(port, () => console.log(`listening on port ${port}`));