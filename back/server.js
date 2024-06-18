const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

let message = '';

app.post('/receive-message', (req, res) => {
  message = req.body.message;
  res.status(200).send({ status: 'Message received' });
});

app.get('/send-message', (req, res) => {
  res.status(200).send({ message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
