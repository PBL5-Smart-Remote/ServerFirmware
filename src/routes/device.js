const express = require('express');
const router = express.Router();

const deviceController = require('../app/controllers/DeviceController');

router.post('/changeStatus', deviceController.changeStatus);
router.get('/:idDevice', deviceController.getDevice)
module.exports = router;