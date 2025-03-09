const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const authenticateUserMiddleware = require('../middleware/authMiddleware');

// Transaction routes
router.post('/',authenticateUserMiddleware(), transactionController.createTransaction);
router.get('/',authenticateUserMiddleware(), transactionController.getAllTransactions);
router.get('/:id',authenticateUserMiddleware(), transactionController.getTransactionById);
router.put('/:id',authenticateUserMiddleware(), transactionController.updateTransaction);
router.delete('/:id',authenticateUserMiddleware(), transactionController.deleteTransaction);

module.exports = router;