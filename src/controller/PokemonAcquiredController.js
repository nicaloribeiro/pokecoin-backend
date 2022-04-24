const PokemonAcquired = require('../models/PokemonAcquired');
const { postPurchaseHistoric, getAllTransactionHistoryByPokemonId, } = require('../controller/TransactionHistoryController');
const { getCurrentInvested } = require('../utils/index');

const postPokemonAcquired = async (req, res) => {
    const { 
        pokemonId,
        pokemonName,
        pokemonExperience,
        pokemonSpriteUrl,
        pokemonType
    } = req.body;

    const pokemonToSave = new PokemonAcquired({
        pokemonId,
        pokemonName,
        pokemonExperience,
        pokemonSpriteUrl,
        pokemonType,
        inWallet: true
    });

    try {
        const pokemonAcquiredSaved = await pokemonToSave.save();
        const historySaved = await postPurchaseHistoric({ pokemonId: pokemonAcquiredSaved._id, pokemonExperience, transactionType: 'BUY' });

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

const postPokemonAcquiredSale = async (req, res) => {
    const { pokemonAcquiredId } = req.params;
       
    try {
        const {inWallet, pokemonExperience} = await PokemonAcquired.findById(pokemonAcquiredId);
        
        if(!inWallet) return res.status(400).json({ message: 'O pokemon já foi vendido.'});

        const pokemonAcquiredUpdated = await PokemonAcquired.findByIdAndUpdate( pokemonAcquiredId, { inWallet: false });
        const historicUpdated = await postPurchaseHistoric({ pokemonId: pokemonAcquiredId, pokemonExperience, transactionType: 'SALE'});
        return res.status(200).json({
            message: 'Seu pokemon foi vendido!',
            data: {
                pokemon: pokemonAcquiredUpdated,
                historic: historicUpdated
            }
        })
    } catch (error) {
         return res.status(400).json({ 
            message: 'Houve um problema ao salvar o Pokemon.',
            errorMessage: error
        });
    }
};

const getAllPokemonsAcquiredInWallet = async (req, res) => {
    try {
        const pokemonsActives = await PokemonAcquired.find({ inWallet: true });
        const historic = await Promise.all(pokemonsActives.map(async (pokemon) => {
            const data = await getAllTransactionHistoryByPokemonId({ pokemonId: pokemon._id});
            return data[0];
        }));
        const currentInvested = getCurrentInvested(historic);

        return res.status(200).json({ 
            message: 'Histórico dos pokemons ativos recuperados com sucesso!',
            data: {
                currentInvested,
                pokemons: historic
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Houve um problema ao recuperar o histórico de pokemons.',
            errorMessage: error
        });
    }
}

module.exports = { postPokemonAcquired, getAllPokemonAcquired, postPokemonAcquiredSale, getAllPokemonsAcquiredInWallet };