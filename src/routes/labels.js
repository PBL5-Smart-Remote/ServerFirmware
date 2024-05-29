const express = require('express');
const router = express.Router();

const labelController = require('../app/controllers/LabelController');

router.get('/:type', labelController.getLabels)

module.exports = router;