// routes/index.js
const express = require('express');
const stagRoutes = require('./stagRoutes');

const router = express.Router();

// You can add more routes as needed
router.use('/stagRequest', stagRoutes);

module.exports = router;
