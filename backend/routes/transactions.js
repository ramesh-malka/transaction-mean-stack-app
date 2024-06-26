const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Load data from JSON file
const fs = require('fs');
const path = require('path');
const transactionsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/transactions.json'), 'utf-8'));

router.get('/load', async (req, res) => {
  try {
    await Transaction.insertMany(transactionsData);
    res.status(200).send('Data loaded into database');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get transactions by date range
router.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = new Date(Number(startDate));
  const end = new Date(Number(endDate));

  try {
    const transactions = await Transaction.find({
      date: { $gte: start, $lte: end },
      status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] },
    }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
