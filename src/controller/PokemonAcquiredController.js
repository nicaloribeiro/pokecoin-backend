const PokemonAcquired = require('../models/PokemonAcquired');
const { postPurchaseHistoric } = require('../controller/TransactionHistoryController');

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
        const historySaved = await postPurchaseHistoric({ pokemonId: pokemonAcquiredSaved._id });
        
        return res.status(200).json({ 
            message: 'Pokemon salvo com sucesso!',
            data: { pokemon: pokemonAcquiredSaved, historic: historySaved }
        });
    } catch (error) {
        return res.status(400).json({ 
            message: 'Houve um problema ao salvar o Pokemon.',
            errorMessage: error
        });
    }
};

const getAllPokemonAcquired = async (req, res) => {
    try {
        const getAllPokemonsAcquired = await PokemonAcquired.find();
        return res.status(200).json({ 
            message: 'Pokemons recuperados com sucesso! ',
            data: getAllPokemonsAcquired
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Houve um problema ao recuperar a lista de pokemons.',
            errorMessage: error
        });
    }
};

module.exports = { postPokemonAcquired, getAllPokemonAcquired };