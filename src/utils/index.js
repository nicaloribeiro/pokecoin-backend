require("dotenv").config();
const axios = require('axios').default;

const SATOSHI = 0.00000001;

const calculatePokemonUsdValue = ({btcCurrency, pokemonExperience}) => parseFloat((btcCurrency) * SATOSHI * pokemonExperience);

const getWalletProfit = (transactionHistory) => {
    const profit = transactionHistory.reduce((total, transaction) => {
        const { pokemonUsdValue } = transaction;
        transaction.transactionType === 'BUY' ? 
        total.profit -= pokemonUsdValue :
        total.profit += pokemonUsdValue
        return total;
    }, { profit : 0});

    return profit;
};

const getBtcCurrency = async () => {
    const response = await axios.get(process.env.COINBASE_API);
    const { amount } = response.data.data;
    return amount;
};

const getCurrentInvested = (transactions) => {
    console.log(transactions)
    const currentInvested = transactions.reduce((total, transaction) => {
        const { pokemonUsdValue } = transaction
        total.invested += pokemonUsdValue
        return total;
    }, { invested : 0});
    
    return currentInvested;
}

module.exports = { getWalletProfit, calculatePokemonUsdValue, getBtcCurrency, getCurrentInvested };