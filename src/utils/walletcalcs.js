const SATOSHI = 0.00000001;

const calculatePokemonUsdValue = (transaction) => parseFloat((transaction.btcCurrency) * SATOSHI * transaction.pokemonId.pokemonExperience);

const getWalletProfit = (transactionHistory) => {
    const profit = transactionHistory.reduce((total, transaction) => {
        transaction.transactionType === 'BUY' ? 
        total.profit -= calculatePokemonUsdValue(transaction) :
        total.profit += calculatePokemonUsdValue(transaction)
        return total;
    }, { profit : 0});

    return profit;
};

module.exports = { getWalletProfit };