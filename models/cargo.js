/**
 * @desc 货物的Schema
 * @type {*|Mongoose}
 */

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const CargoSchema = new Schema({
    cargoId: { type:ObjectId },
    cargoName: { type: String},
    cargoAddTime: { type:String } //货物种类添加入数据库的时间
});


CargoSchema.index({cargoId: 1},{unique: true});

mongoose.model('Cargoes', CargoSchema);