/**
 * @desc 货物的Schema
 * @type {*|Mongoose}
 */

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var plugin = require('./plugins')
const CargoSchema = new Schema({
    cargoName: { type: String},
    cargoAddTime: { type:String } //货物种类添加入数据库的时间
});


CargoSchema.index({cargoId: 1},{unique: true});
CargoSchema.plugin(plugin)
mongoose.model('Cargoes', CargoSchema);