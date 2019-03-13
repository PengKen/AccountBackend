/**
 * @method Post,GET,DELETE
 * @desc 用户账户清单控制器
 */
const jwtUtil = require('../JWT')
const logger = require('../log')
const models = require('../models')

/**
 *
 * @param req
 * @param res
 * @param next
 * @return [cargoNameA，cargoNameB， cargoNameC]
 */
exports.getCargoList= function (req,res,next) {
    res.send(['聚碳','ABS树脂','聚乙烯','聚氯乙烯','聚缩醛'])
}