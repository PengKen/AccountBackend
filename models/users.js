/**
 * @desc 客户的Schma和用户是同一个Schema
 * @type {*|Mongoose}
 */
const logger = require('../log/index')
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const ClientSchema = require('./clients')
const CargoSchema = require("./cargoes")
const AccountSchema = require('./accounts')
const UserSchema = new Schema({
    shopName: { type: String, required:true },
    password: { type: String,required:true },
    rank:{type:Number,default:-1},//用户等级
    phone: { type: String },
    avatar: { type: String,default:'http://localhost:3000/images/default_User.jpg'},
    lastLoginTime: {type: String,required:true}, //上次登陆的时间
    clients:[ ClientSchema ], //客户列表
    cargoList:[ CargoSchema ], //货物列表
    accountRecord:[AccountSchema ] //账单记录
});


UserSchema.index({userId: 1}, { unique : true});
UserSchema.virtual('userId').get(function () {
    return this._id;
});


mongoose.model('Users', UserSchema);