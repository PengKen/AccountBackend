/**
 * @method Post
 * @desc 登录控制器
 * @param req.body {  phone,  password, deviceInfo:{ipAddress，} }
 * @param res
 * @param next
 */
const jwtUtil = require('../JWT')
const logger = require('../log')
const models = require('../models')
exports.login = function (req,res,next) {

    jwtUtil.jwtSign(req.body.deviceInfo).then(token => res.send(token))
}