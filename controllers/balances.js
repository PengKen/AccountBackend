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
const Account = models.Accounts
const moment = require('moment')
exports.getBalances = function (req,res,next) {
    var balances = 0
    Account.searchAccounts(req.params.userId,function (accounts) {

        accounts.forEach(function (account, index, array) {
            if(account.transactionType === 'sell'){
                balances += account.havePay.replace(/,/g,'').slice(0,-2) | 0
            }else{
                balances -= account.havePay.replace(/,/g,'').slice(0,-2) | 0
            }
        })

        res.send({balances})

    },function (errorMessage) {
        res.send(errorMessage)
    })


}


exports.getCurrentMonthCaisher = function (req,res,next) {
    var buyBalances = 0
    var sellBalances = 0
    Account.searchAccounts(req.params.userId,function (accounts) {
        var maxDay = moment().endOf('month')
        var minDay = moment().startOf("month")
        accounts.forEach(function (account, index, array) {
            if(moment(account.date).isBefore(maxDay) && moment(account.date).isAfter(minDay)){
                if(account.transactionType === 'sell'){
                    sellBalances += account.havePay.replace(/,/g,'').slice(0,-2) | 0
                }else{
                    buyBalances -= account.havePay.replace(/,/g,'').slice(0,-2) | 0
                }
            }

        })

        res.send({buyBalances,sellBalances})

    },function (errorMessage) {
        res.send(errorMessage)
    })
}



