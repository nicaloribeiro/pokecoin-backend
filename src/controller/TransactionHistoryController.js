const TransactionHistory = require('../models/TransactionHistory');
const { getWalletProfit, getBtcCurrency, calculatePokemonUsdValue } = require('../utils');

const postPurchaseHistoric = async (payload) => {
    const { pokemonId, pokemonExperience, transactionType } = payload;
    try {
        const btcCurrency = await getBtcCurrency();
        const pokemonUsdValue = calculatePokemonUsdValue({ btcCurrency, pokemonExperience});
        const transactionToSave = new TransactionHistory({
            transactionType,
            pokemonUsdValue,
            btcCurrency,
            pokemonId
        });
        const transactionSaved = await transactionToSave.save();
        return transactionSaved;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const getAllTransactionHistory = async (req, res) => {
    try {
        const getAllTransactionsHistory = await TransactionHistory.find().populate('pokemonId').exec();
        const profit = getWalletProfit(getAllTransactionsHistory);        
        return res.status(200).json({ 
            message: 'Histórico recuperado com sucesso! ',
            data: {
                currentProfit: profit,
                transactions: getAllTransactionsHistory
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Houve um problema ao recuperar o histórico de transações.',
            errorMessage: error
        });
    }
};

const getAllTransactionHistoryByPokemonId = async (payload) => {
    const { pokemonId } = payload;
    try {
        const transactions = await TransactionHistory.find({ pokemonId });
        return transactions;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = { postPurchaseHistoric, getAllTransactionHistory, getAllTransactionHistoryByPokemonId }