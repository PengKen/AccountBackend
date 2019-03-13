/**
 * @desc 用户货物清单
 * @type
 */

var express = require('express');
var router = express.Router();
var cargoListController = require('../controllers/cargoList')

router.get('/:userId', cargoListController.getCargoList);

module.exports = router;

