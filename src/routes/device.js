const express = require('express');
const router = express.Router();

const deviceController = require('../app/controllers/DeviceController');

router.put('/updateByAudio', deviceController.updateByAudio)
router.post('/changeStatus', deviceController.changeStatus);
router.get('/:idDevice', deviceController.getDevice)
router.put('/update/:idDevice', deviceController.updateDevice)

module.exports = router;