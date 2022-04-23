const express = require('express');
const pokemonAcquiredRoutes = express.Router();
const pokemonAcquiredControllers = require('../controller/PokemonAcquiredController');
const { postPokemonAcquired, getAllPokemonAcquired, postPokemonAcquiredSale } = pokemonAcquiredControllers;

pokemonAcquiredRoutes.post('/pokemon/buy', postPokemonAcquired);
pokemonAcquiredRoutes.get('/pokemon/all', getAllPokemonAcquired);
pokemonAcquiredRoutes.post('/pokemon/sell/:pokemonAcquiredId', postPokemonAcquiredSale);

module.exports = pokemonAcquiredRoutes;
