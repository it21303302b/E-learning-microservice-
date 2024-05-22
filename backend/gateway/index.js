const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/payment', proxy('http://localhost:8003')); //payment
app.use('/auth', proxy('http://localhost:8070')); //auth-service
app.use('/items', proxy('http://localhost:4001')); //Course Management

app.listen(8000, () => {
  console.log('gateway is listening to port 8000');
});
