const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
