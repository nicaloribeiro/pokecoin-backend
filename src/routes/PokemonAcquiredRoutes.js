const express = require('express');
const pokemonAcquiredRoutes = express.Router();
const { postPokemonAcquired, getAllPokemonAcquired, postPokemonAcquiredSale } = require('../controller/PokemonAcquiredController');

pokemonAcquiredRoutes.post('/pokemon/buy', postPokemonAcquired);
pokemonAcquiredRoutes.get('/pokemon/all', getAllPokemonAcquired);
pokemonAcquiredRoutes.post('/pokemon/sell/:pokemonAcquiredId', postPokemonAcquiredSale);

module.exports = pokemonAcquiredRoutes;
