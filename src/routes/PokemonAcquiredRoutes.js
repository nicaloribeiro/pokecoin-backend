const express = require('express');
const pokemonAcquiredRoutes = express.Router();
const { postPokemonAcquired, getAllPokemonAcquired, postPokemonAcquiredSale, getAllPokemonsAcquiredInWallet } = require('../controller/PokemonAcquiredController');

pokemonAcquiredRoutes.get('/pokemon/all', getAllPokemonAcquired);
pokemonAcquiredRoutes.get('/pokemon/all/actives', getAllPokemonsAcquiredInWallet);
pokemonAcquiredRoutes.post('/pokemon/buy', postPokemonAcquired);
pokemonAcquiredRoutes.post('/pokemon/sell/:pokemonAcquiredId', postPokemonAcquiredSale);

module.exports = pokemonAcquiredRoutes;
