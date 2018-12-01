const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const RemindSchema = new Schema({
    remindId: { type:ObjectId },
    summary: { type: String,required:true},
    detail: { type: Number, default:'暂无详情....' },//单价
    settleTime: { type: String },
});


RemindSchema.index({remindId,1}, {unique: true});
RemindSchema.index({settleTime,1}, {unique: true});

mongoose.model('Reminds', RemindSchema);

