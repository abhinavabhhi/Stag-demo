const express = require('express');
const router = express.Router();
const stagController = require('../controllers/stagController');

router.get('/', stagController.getAllStagRequests);
router.post('/create', stagController.createStagRequest);
router.put('/update', stagController.updateStagRequest);
// router.post('/delete', stagController.deleteStagRequest);
router.get('/getAttachments', stagController.getAllAttachments);
// router.post('/stagRequests/delete/:id', stagController.deleteStagRequest);

module.exports = router;
