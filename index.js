let path = require("path");
let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server);

// public dir
app.use(express.static(path.join(__dirname, 'public')));

// router
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/chat.html'));
});

// Socket
io.on('connection', (socket) => {
    console.log('Welcome to server chat');
    socket.on('send', (data) => {
        io.sockets.emit('send', data);
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000...');
})