 const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/account', {
     useNewUrlParser:true,
     autoIndex:false,
     keepAlive: 120

 },function (err) {
     console.log(err)
 });
 const connection = mongoose.createConnection('mongodb://localhost/account',
    {
        useNewUrlParser:true,
        autoIndex:false,
        keepAlive: 120

    });

  /**
  * commonjs 规范，执行时才知道输入输出，这里require了，对应的文件才会去执行
  */
 require('./users')

 exports.Users = mongoose.model('Users')
 exports.Clients = mongoose.model('Clients')
 exports.Accounts = mongoose.model('Accounts')
 exports.Cargoes = mongoose.model('Cargoes')
