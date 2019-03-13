/**
 * @desc 近期提醒
 * @type
 */

var express = require('express');
var router = express.Router();
var remindsController = require('../controllers/reminds')

router.get('/:userId', remindsController.getReminds);

module.exports = router;

