/**
 * @desc 账户资金路由
 * @type
 */

var express = require('express');
var router = express.Router();
var balancesController = require('../controllers/balances')

router.get('/:userId', balancesController.getCurrentMonthCaisher);

module.exports = router;

