require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr =
  'mongodb+srv://janithchathurangakck:janith11@cluster0.yl3i9bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(connectionStr, { useNewUrlParser: true })
  .then(() => console.log('connected to mongod'))
  .catch((err) => console.log(err));

mongoose.connection.on('error', (err) => {
  console.log(err);
});
