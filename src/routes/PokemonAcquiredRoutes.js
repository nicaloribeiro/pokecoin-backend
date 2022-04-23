const express = require('express');
const pokemonAcquiredRoutes = express.Router();
const pokemonAcquiredControllers = require('../controller/PokemonAcquiredController');
const { postPokemonAcquired, getAllPokemonAcquired } = pokemonAcquiredControllers;

pokemonAcquiredRoutes.post('/pokemon/new', postPokemonAcquired);
pokemonAcquiredRoutes.get('/pokemon/all', getAllPokemonAcquired);

module.exports = pokemonAcquiredRoutes;
