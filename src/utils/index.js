require("dotenv").config();
const axios = require('axios').default;

const SATOSHI = 0.00000001;

const calculatePokemonUsdValue = ({btcCurrency, pokemonExperience}) => parseFloat((btcCurrency) * SATOSHI * pokemonExperience);

const getWalletProfit = (transactionHistory) => {
    const profit = transactionHistory.reduce((total, transaction) => {
        const { btcCurrency } = transaction
        const { pokemonExperience } = transaction.pokemonId
        transaction.transactionType === 'BUY' ? 
        total.profit -= calculatePokemonUsdValue({btcCurrency, pokemonExperience}) :
        total.profit += calculatePokemonUsdValue({btcCurrency, pokemonExperience})
        return total;
    }, { profit : 0});

    return profit;
};

const getBtcCurrency = async () => {
    const response = await axios.get(process.env.COINBASE_API);
    const { amount } = response.data.data;
    return amount;
};

module.exports = { getWalletProfit, calculatePokemonUsdValue, getBtcCurrency };