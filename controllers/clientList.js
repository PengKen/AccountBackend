/**
 * @method Post,GET,DELETE
 * @desc 客户列表控制器
 */
const jwtUtil = require('../JWT')
const logger = require('../log')
const models = require('../models')
const Clients = models.Clients
const mongoose  = require('mongoose');
const User = require('../models').Users

/**
 *
 * @param req
 * @param res
 * @param next
 * @return [cargoNameA，cargoNameB， cargoNameC]
 */
exports.getClientNameList= function (req,res,next) {
    User.findById(req.params.userId,function (err,user) {
        if(err){
            console.log(err)
            logger.DBerr(err)
        }else{
            var clientLists  = []
            user.clients.map((client)=>{
                clientLists.push(client.name)
            })
           res.send(clientLists)
        }
    })
}

exports.addClient = function (req,res,next) {
    const { personalInfo, data: client } = req.body
    User.findById(personalInfo.userId,function (err,user) {
        if(err){
            console.log(err)
            logger.DBerr(err)
        }else{
            user.addTargetClient(client,function (result) {
                if(result.errorMessage)
                    res.send({errorMessage:result.errorMessage})
                else
                    res.send({message:'ok'})
            })
        }
    })
}