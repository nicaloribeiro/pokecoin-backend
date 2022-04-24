require("dotenv").config();
const axios = require('axios').default;
const TransactionHistory = require('../models/TransactionHistory');
const { getWalletProfit } = require('../utils/walletcalcs');

const getBtcCurrency = async () => {
    const response = await axios.get(process.env.COINBASE_API);
    const { amount } = response.data.data;
    return amount;
};

const postPurchaseHistoric = async (payload) => {
    const { pokemonId, transactionType } = payload;
    try {
        const btcCurrency = await getBtcCurrency();
        const transactionToSave = new TransactionHistory({
            transactionType,
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

module.exports = { postPurchaseHistoric, getAllTransactionHistory }