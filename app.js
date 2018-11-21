var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
var log = require('log')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/account', {useNewUrlParser:true});
// // mongoose.use('autoIndex', false);//最好自行关闭
// var Schema = mongoose.Schema
// const CatSchema = new Schema({
//   name:String
// })
//
// const CatShopSchema = new Schema({
//   cats:[CatSchema]
// })
//
//
//
// CatSchema.statics.test = function (name,callback) {
//   //这里的this指的是model，statics是给model使用的，也就是给类使用的，model就是一个类
//   //如果是methods指的也是model，methods是实例方法，也就是给实例用的，也就是给new ***Model()使用的
//   this.find({name:name},function (err,results) {
//
//   })
// }
//
// /*
//   statics 要定义在model定义之前
//  */
// const Cat = mongoose.model('Cat',CatSchema);
//
// const cat = new Cat({ name: 'Zildjian' });
// const catshop = mongoose.model('cats',CatShopSchema)
// const cats  = new catshop({cats:[cat]})
//
//
// cats.cats.push({name:'another_cat'})
// cats.save().then(function (value) { console.log(value) })





moment.locale('zh-cn')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const log = require("./config/log");
// logger
app.all("*", async (req, res, next) => {
    //响应开始时间
    const start = new Date();
//响应间隔时间
var ms;
ms = new Date() - start;
try {
    //开始进入到下一个中间件
    await next();
    //记录响应日志
    log.i(req, ms);
} catch (error) {
    //记录异常日志
    log.e(req, error, ms);
}
console.log(`${req.method} ${req.url} - ${ms}ms-${res.statusCode}`);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get("/api/balances/1",function (req,res) {
  res.send({balance:10000000})
})

app.get('/merroy_leak_test',function (req,res) {
  const heapdump = require('heapdump');
  let leakObject = null;
  let count = 0;

  setInterval(function testMemoryLeak() {
    const originLeakObject = leakObject;
    const unused = function () {
      if (originLeakObject) {
        console.log('originLeakObject');
      }
    };
    leakObject = {
      count: String(count++),
      leakStr: new Array(1e7).join('*'),
      leakMethod: function () {
        console.log('leakMessage');
      }
    };
  }, 10);
  res.send("leak")
})

app.get('/api/cargo_list/1',function (req,res) {
  res.send(["A",'B','C'])
})
app.get('/api/client_list_detail/1',function (req,res) {
  res.send([
    {
      name:'A',
      clientId:1,
      phoneNumber:123,
      addTime:'2018年3月3日'
    },
    {
      name:'B',
      clientId:2,
      phoneNumber:123,
      addTime:'2018年3月3日'
    },

  ])
})


app.get('/api/client_list/1',function (req,res) {
  res.send(['A','B','w'])
})
app.get('/api/accounts/1',function (req,res) {
  console.log("in")
  switch(req.query.type){
    case 'recently' :
      res.send([
        {
          accountId: 0,
          date: '2018-8-8',
          cargoName: 'A',
          amount: 1000,
          money:2000,
          transactionType: 'buy',
          clientName: 'Ken',
          images: [
            {uri:'https://facebook.github.io/react-native/docs/assets/favicon.png',url:'https://facebook.github.io/react-native/docs/assets/favicon.png',key:'0'},
            {uri:'https://facebook.github.io/react-native/docs/assets/favicon.png',url:'https://facebook.github.io/react-native/docs/assets/favicon.png',key:'1'},
            {uri:'https://facebook.github.io/react-native/docs/assets/favicon.png',url:'https://facebook.github.io/react-native/docs/assets/favicon.png',key:'2'},
            {uri:'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%9C%8D%E5%8A%A1%E5%99%A8%20%E8%AE%BE%E7%BD%AEhttps&step_word=&hs=0&pn=10&spn=0&di=117042999481&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2904248848%2C1434703173&os=4029775269%2C443578380&simid=3330087462%2C59618408&adpicid=0&lpn=0&ln=1916&fr=&fmq=1541508575696_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fwww.51wendang.com%2Fpic%2Fe908992fb009758202226275%2F1-493-png_6_0_0_135_519_623_387_892.979_1262.879-795-0-0-795.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bc8ojg1wg2_z%26e3Bv54AzdH3F15vAzdH3Fjlablldukaal0cbdadddmd0c&gsm=0&rpstart=0&rpnum=0&islist=&querylist=',
              url:'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%9C%8D%E5%8A%A1%E5%99%A8%20%E8%AE%BE%E7%BD%AEhttps&step_word=&hs=0&pn=10&spn=0&di=117042999481&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2904248848%2C1434703173&os=4029775269%2C443578380&simid=3330087462%2C59618408&adpicid=0&lpn=0&ln=1916&fr=&fmq=1541508575696_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fwww.51wendang.com%2Fpic%2Fe908992fb009758202226275%2F1-493-png_6_0_0_135_519_623_387_892.979_1262.879-795-0-0-795.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bc8ojg1wg2_z%26e3Bv54AzdH3F15vAzdH3Fjlablldukaal0cbdadddmd0c&gsm=0&rpstart=0&rpnum=0&islist=&querylist=',key:'3'}],
          remark:'woshi remamdsafasfasdsad'
        }

      ])
      return
  }
  res.status(400).send('参数错误！')

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
