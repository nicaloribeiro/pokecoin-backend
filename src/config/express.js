const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PokemonAcquiredRouter = require('../routes/PokemonAcquiredRoutes');

const app = express();

app.set('port', process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

app.use('/api/buy', PokemonAcquiredRouter);

module.exports = app;