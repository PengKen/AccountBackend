/**
 * @desc 登录路由
 * @type
 */

var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login')

router.post('/', loginController.login);

module.exports = router;

