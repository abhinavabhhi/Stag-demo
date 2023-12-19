const express = require('express');
const stagRoutes = require('./stagRoutes');
const router = express.Router();
router.use('/stagRequest', stagRoutes);
module.exports = router;
