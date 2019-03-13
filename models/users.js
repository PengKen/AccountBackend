/**
 * @desc 客户的Schma和用户是同一个Schema
 * @type {*|Mongoose}
 */
const logger = require('../log/index')
const mongoose  = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const ClientSchema = require('./clients').ClientSchema
const CargoSchema = require("./cargoes")
const AccountSchema = require('./accounts')
const Clients = require('../models').Clients
const UserSchema = new Schema({
    shopName: { type: String, required:true },
    password: { type: String,required:true },
    rank:{type:Number,default:-1},//用户等级
    phone: { type: String,unique: true ,index: true,dropDups: true},
    avatar: { type: String,default:'http://localhost:3000/images/default_User.jpg'},
    lastLoginTime: {type: String,required:true}, //上次登陆的时间
    clients:[ ClientSchema ], //客户列表
    cargoList:[ CargoSchema ], //货物列表
    accounts:[AccountSchema ], //账单记录
    address:'',//店铺地址
});


UserSchema.virtual('userId').get(function () {
    return this._id;
});

UserSchema.method('addTargetClient',function (targetClient,errorCallback) {
    // console.log(mongoose.model('Clients'))
    // console.log('////////////')
    // console.log(mongoose.model('Clients',ClientSchema) === mongoose.model('Clients'))
    var Client = mongoose.model('Clients')
    let  client = new Client(targetClient)
    console.log(client)
    this.clients.push(client)
    this.save(function (err,result) {
        if(err) {
            logger.DBerr(err)
            errorCallback ? errorCallback({errorMessage:'上传失败'}) : null
            return
        }
        else{
            console.log("send");
            errorCallback('ok')
        }
    })

})

mongoose.model('Users', UserSchema);