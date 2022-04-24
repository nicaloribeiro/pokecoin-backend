const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PokemonAcquiredRouter = require('../routes/PokemonAcquiredRoutes');
const TransactionHistoryRouter = require('../routes/TransactionHistoryRoutes');

const app = express();

app.set('port', process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

app.use('/api', PokemonAcquiredRouter);
app.use('/api', TransactionHistoryRouter);

module.exports = app;