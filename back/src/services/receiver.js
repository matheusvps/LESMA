const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventEmitter = require('events');
const WebSocket = require('ws');

const app = express();

app.use(cors({
  origin: '*'
}));

const port = 5000;

app.use(bodyParser.json());

let storedMessage = '';
const messageEmitter = new EventEmitter();

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log(`Client \x1b[4m\x1b[33m ${ws._socket.remoteAddress.split(':')[3] === undefined ? 'local access' : ws._socket.remoteAddress.split(':')[3]} \x1b[0m connected`);
  
  messageEmitter.on('newMessage', (message) => {
    // console.log('new message ws', message);
    ws.send(JSON.stringify({ message }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.post('/receive-message', (req, res) => {
  storedMessage = req.body.message;
  res.status(200).json({ status: 'Message received' });
  // console.log('entrei receive socorro', req.body);
  // Emitir evento quando uma nova mensagem é recebida
  messageEmitter.emit('newMessage', storedMessage);
});

