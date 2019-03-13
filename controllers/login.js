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
var moment = require('moment');
moment.locale('zh-cn')
exports.login = function (req,res,next) {
    console.log("login");
    const {  data } = req.body
    models.Users.findOne({ phone:data.phone, password:data.password }, function (err,user) {
        if (err) {
            logger.DBerr(err)
            res.status(400).send({errorMessage:'参数错误'})
        }
        if(user) {
            jwtUtil.jwtSign(Object.assign({},{DEVICE_INFO:data.DEVICE_INFO,lastLoginTime:data.lastLoginTime}))
                .then(token => res.send({token,userId:user.userId,...user._doc,}));

            user.lastLoginTime = moment().format('YYYY-M-DD HH:mm')
            user.save(function (err) {
                if(err) logger.DBerr(err)
            })
        }else{
            res.status(401).send({errorMessage:'用户名或密码错误'})
        }

    });
    // res.send({errorMessage:'error'})


}