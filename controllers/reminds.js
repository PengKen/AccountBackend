/**
 * @method POST, GET, DELETE, PUT
 * @desc 近期提醒控制器
 * @param req.query { type: 'recently', 'all' }
 * @param res [{ remindId, summary(概要) , date , detail(消息内容)}]
 * @param next
 */

const jwtUtil = require('../JWT')
const logger = require('../log')
const models = require('../models')
exports.getReminds = function (req,res,next) {
    switch (req.query.type) {
        case 'recently' :
            res.send([
                {
                    remindId: 0,
                    date: '2018-8-8',
                    summary:'到二胖家里提货',
                    detail:'上周约定提货5吨，每吨7000块 '
                },
                {
                    remindId: 1,
                    date: '2018-8-6',
                    summary:'入货1000公斤树脂',
                    detail:'老王 电话13602803069'
                }

            ])
            return
        default :
            res.status(400).send({errorMessage:'参数错误!'})
    }



}