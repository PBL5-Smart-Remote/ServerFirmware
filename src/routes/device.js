const express = require('express');
const router = express.Router();

const deviceController = require('../app/controllers/DeviceController');

router.post('/changeStatus', deviceController.changeStatus);

module.exports = router;