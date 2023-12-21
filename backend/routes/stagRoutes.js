const express = require('express');
const router = express.Router();
const stagController = require('../controllers/stagController');

router.get('/', stagController.getAllStagRequests);
router.post('/create', stagController.createStagRequest);
router.put('/update', stagController.updateStagRequest);
router.get('/view/:id', stagController.getStagRequestById);
router.delete('/delete/:id', stagController.deleteStagRequest);

module.exports = router;
