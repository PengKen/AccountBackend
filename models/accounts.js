const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const AccountSchema = new Schema({
    accountId: { type:ObjectId },
    clientName: { type: String,required:true},
    price: { type: Number, required:true },//单价
    totalPrice: { type: String },
    havePay: { type: String },
    needPay:{type:Number},
    date:{type:String},
    remark:{type:String},
    amount:{type:Number},
    transactionType:{type:String}//交易类型{buy,sell}
});


AccountSchema.index({userId: 1}, {unique: true});

mongoose.model('Accounts', AccountSchema);

