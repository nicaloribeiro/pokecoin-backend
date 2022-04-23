const express = require('express');
const pokemonAcquiredRoutes = express.Router();
const pokemonAcquiredControllers = require('../controller/PokemonAcquiredController');
const { postPokemonAcquired } = pokemonAcquiredControllers;

pokemonAcquiredRoutes.post('/pokemon/new', postPokemonAcquired);

module.exports = pokemonAcquiredRoutes;
