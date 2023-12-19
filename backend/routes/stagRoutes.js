const express = require('express');
const router = express.Router();
const stagController = require('../controllers/stagController');

router.get('/', stagController.getAllStagRequests);
router.get('/view/:id', stagController.getStagRequestById);
router.post('/create', stagController.createStagRequest);
router.put('/update', stagController.updateStagRequest);
router.delete('/delete/:id', stagController.deleteStagRequest);

module.exports = router;
