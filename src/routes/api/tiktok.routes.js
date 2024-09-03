const express = require('express');
const { check, param } = require('express-validator');

const router = express.Router();

const TiktokController = require('./../../controllers/api/tiktok.controller');

router.post('/', [check('url').not().isEmpty().withMessage('url is required')], TiktokController.store);

module.exports = router;
