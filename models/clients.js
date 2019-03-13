const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const logger = require( '../log')
var ObjectId = mongoose.Schema.Types.ObjectId;
const ClientSchema = new Schema({
    name: { type: String},
    phone: { type: String },
    avatar: { type: String,default:'http://localhost:3000/images/default_User.jpg' },
    addTime: { type: String },
    remark: { type: String }
});

ClientSchema.virtual('clientId').get(function () {
    return this._id;
});

ClientSchema.statics.add = function(userId,client,errorCallback){
    mongoose.model('Users').findById(userId,function (err,user) {
        if(err) {
            console.log(err)
            logger.DBerr(err)
            errorCallback ? errorCallback({errorMessage:'上传失败'}) : null
            return
        }
        let  client = new mongoose.model('Clients')(client)

        user.clients.push(client)
        console.log(user)
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


exports.ClientSchema = ClientSchema
mongoose.model('Clients', ClientSchema);