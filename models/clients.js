const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const ClientSchema = new Schema({
    userId: { type:ObjectId },
    name: { type: String},
    passWord: { type: String },
    phone: { type: String },
    avatar: { type: String },
    lastLoginTime: {type: String},
});


UserSchema.index({userId: 1}, {unique: true});

mongoose.model('Clients', ClientSchema);