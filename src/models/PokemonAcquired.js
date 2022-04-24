const mongoose = require('mongoose');
const { Schema } = mongoose;

const pokemonAcquiredSchema = new Schema({
    pokemonId: { type: String, required: true },
    pokemonName: { type: String, required: true },
    pokemonExperience: { type: Number, required: true },
    pokemonSpriteUrl: { type: String, required: true },
    pokemonType: { type: String, required: true },
    inWallet: { type: Boolean, required: true}
});

const PokemonAcquired = mongoose.model('PokemonAcquired', pokemonAcquiredSchema);

module.exports = PokemonAcquired;