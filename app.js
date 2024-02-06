const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    // Sending an example message
    socket.emit('clientMessage', { value: "Connection successful. Welcome to the server!" });
    
    // Logging the message sent by the client to the console
    socket.on('clientMessage', (data) => {
        console.log('Client message:', data.value);
        
        // Sending the message from the server to all clients
        io.emit('serverMessage', { value: data.value });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
