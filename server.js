const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');
const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
   });
const io = socket(server); 

const messages = [];


app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/client/${name}`));
    };
    next();
});

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req,res) => {
    res.show('index.html');
});

app.use((req, res) => {
    res.status(404).send('404 not found');
})

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
         console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
     });
    socket.on('disconnect', () => { console.log('Oh, socket ' + 
        socket.id + ' has left') });
    console.log('I\'ve added a listener on message event \n');
   });