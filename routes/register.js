/**
 * @desc 注册路由
 * @type {createApplication}
 */

var express = require('express');
var router = express.Router();
var registerController = require('../controllers/register')

router.post('/', registerController.saveUser);

module.exports = router;
