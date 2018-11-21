/**
 * @desc 客户的Schma和用户是同一个Schema
 * @type {*|Mongoose}
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const ClientSchema = require('./clients')
const CargoSchema = require("./cargo")
const UserSchema = new Schema({
    userId: { type:ObjectId },
    name: { type: String},
    passWord: { type: String },
    phone: { type: String },
    avatar: { type: String },
    lastLoginTime: {type: String}, //上次登陆的时间
    clients:[ ClientSchema ], //客户列表
    cargoList:[ CargoSchema ], //货物列表
    accountRecord:[accountSchema ] //账单记录
});


UserSchema.index({userId: 1}, { unique : true});

mongoose.model('Users', UserSchema);