
var logger = require('../log')
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var moment = require('moment');
const AccountSchema = new Schema({
    client: { type: String,required:true},
    price: { type: String, required:true },//单价
    totalPrice: { type: String },
    havePay: { type: String },
    needPay:{type:String},
    date:{type:String},
    remark:{type:String},
    amount:{type:String},
    imageUrls:[],
    cargo:{type:String},
    transactionType:{type:String,required:true}//交易类型{buy,sell}
});


AccountSchema.index({userId: 1}, { unique: true });
AccountSchema.virtual('accountId').get(function () {
    return this._id;
});
AccountSchema.statics.add = function(userId,account,errorCallback){
    mongoose.model('Users').findOne({phone:"123"},function (err,user) {


        if(err) {
            logger.DBerr(err)
            errorCallback ? errorCallback({errorMessage:'上传失败'}) : null
            return
        }
        console.log(account)
        user.accounts.push(account)
        user.save(function (err,result) {
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
}

AccountSchema.statics.searchAccounts= function(userId,sucessCallback,errorCallback){
    mongoose.model('Users').findById(userId, function (err, user) {
        if(err){
            logger.DBerr(err)
            errorCallback ? errorCallback({errorMessage:'加载失败'}) : null
            return
        }
        sucessCallback(user.accounts)
    });
}


mongoose.model('Accounts', AccountSchema);

