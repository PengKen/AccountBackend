/**
 * @method Post
 * @desc 注册控制器
 * @param req.body { shopName,phone,avatar,password  }
 * @param res
 * @param next
 */
const logger = require('../log')
const models = require('../models')
exports.saveUser = function (req,res,next) {

    var User = new models.Users(req.body)
    User.save(function (err,user) {
        if(err) {
            logger.DBerr(err)
            res.status(500).end("注册失败！")
        }
        res.end("OK")
    })

}