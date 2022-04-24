const express = require('express');
const transactionHistoryRoutes = express.Router();
const { getAllTransactionHistory } = require('../controller/TransactionHistoryController');

transactionHistoryRoutes.get('/transactions/all', getAllTransactionHistory);

module.exports = transactionHistoryRoutes;