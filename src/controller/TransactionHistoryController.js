require("dotenv").config();
const axios = require('axios').default;
const TransactionHistory = require('../models/TransactionHistory');

const getBtcCurrency = async () => {
    const response = await axios.get(process.env.COINBASE_API);
    const { amount } = response.data.data;
    return amount;
}

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

module.exports = { postPurchaseHistoric }