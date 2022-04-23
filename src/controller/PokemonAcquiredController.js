const PokemonAcquired = require('../models/PokemonAcquired');

const postPokemonAcquired = async (req, res) => {
    const { 
        pokemonId,
        pokemonName,
        pokemonExperience,
        pokemonSpriteUrl
    } = req.body;

    const pokemonToSave = new PokemonAcquired({
        pokemonId,
        pokemonName,
        pokemonExperience,
        pokemonSpriteUrl,
        inWallet: true
    });

    try {
        const pokemonAcquiredSaved = await pokemonToSave.save();
        return res.status(200).json({ 
            message: 'Pokemon salvo com sucesso!',
            data: {pokemonAcquiredSaved}
        });
    } catch (error) {
        return res.status(400).json({ 
            message: 'Houve um problema ao salvar o Pokemon.',
            errorMessage: error
        });
    }
};

module.exports = { postPokemonAcquired };