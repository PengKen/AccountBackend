/**
 * @desc 账单信息路由
 * @type
 */

var express = require('express');
var router = express.Router();
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'upload-IMGs/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ file.originalname.slice(file.originalname.indexOf('.')))
    }
})

// var upload = multer({ storage: storage })
var upload = multer()
var accountsController = require('../controllers/account')
router.get('/:id', accountsController.getAccountsInfo);
router.post('/:id',accountsController.addAccount)
router.get('/',accountsController.saveToExcel)
module.exports = router;
