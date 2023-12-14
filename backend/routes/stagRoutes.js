const express = require('express');
const router = express.Router();
const stagController = require('../controllers/stagController');

router.get('/', stagController.getAllStagRequests);
router.post('/create', stagController.createStagRequest);

module.exports = router;
