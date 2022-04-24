const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionTypeEnum = {
    buy: 'BUY',
    sale: 'SALE'
}

const transactionHistorySchema = new Schema({
    btcCurrency: { type: String, required: true },
    pokemonUsdValue: { type: Number, required: true},
    transactionType : { 
        type: String,
        enum: Object.values(transactionTypeEnum),
        required: true
    },
    transactionDate : { type: Date, default: Date.now },
    pokemonId: { 
        type: Schema.Types.ObjectId, 
        ref: 'PokemonAcquired',
        required: true
    }
});

const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);

module.exports = TransactionHistory;