/**
 * @desc 客户列表
 * @type
 */

var express = require('express');
var router = express.Router();
var clientListController = require('../controllers/clientList')

router.get('/:userId', clientListController.getClientNameList);
router.post('/',clientListController.addClient)
module.exports = router;

