const express = require('express');
const router = express.Router();

const espController = require('../app/controllers/ESPController');

// /connect/:id?numPort=
router.get('/connect/:_idESP', espController.connect);
// router.post('/:idESP', espController.post);
router.get('/:_idESP', espController.getInfo);

module.exports = router;