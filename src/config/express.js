const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

module.exports = app;