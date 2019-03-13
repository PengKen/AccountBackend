var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/logins')
var balancesRouter = require('./routes/balances')
var accountsRouter = require('./routes/accounts')
var cargoListRouter = require('./routes/cargoLists')
var clientListRouter = require('./routes/clientLists')
var remindsRouter = require('./routes/reminds')
var caishersRouter = require('./routes/caishers')
var mongoDBModles = require('./models')
var jwtUtil = require('./JWT/index')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload-IMGs')));

const Logger = require("./log");
app.post('/api/regist',function (req,res) {
    var user = new mongoDBModles.Users(req.body)
    user.save(function (err,result) {
        if(err) {
            console.log(err)
            Logger.DBerr(err);
        }
        console.log(result)
    })
    res.send('ok')

})

// logger
 app.all("*", async (req, res, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
//     ms = new Date() - start;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Auth-Token');
    res.header('Access-Control-Allow-Methods', 'POST,DELETE,PUT,GET,OPTIONS');
    try {
    //     // OPTIONS 请求快速返回
         if(req.method === 'OPTIONS') {
             res.send("ok");
             return;
         }
        //token 验证
        if(req.originalUrl.indexOf('/api/logins') < 0 && req.method !== 'OPTIONS'){
            if(req.headers['content-type'])
            await jwtUtil.jwtVerify(req.headers['auth-token'],res,req);

        }
    //     //开始进入到下一个中间件
        await next();
    //     //记录响应日志
    //     Logger.response(req, ms);
    } catch (error) {
    //     //记录异常日志
        Logger.error(req, error, ms);
    }
    // console.log(`${req.method} ${req.url} - ${ms}ms-${res.statusCode}`);
});
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: 500000000000000}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter)
app.use('/api/logins',loginRouter) //登录路由
app.use("/api/balances",balancesRouter) //账户资金路由
app.use("/api/accounts",accountsRouter) //账单路由
app.use("/api/cargo_lists",cargoListRouter) //用户所持有的货物类型
app.use("/api/client_lists",clientListRouter)
app.use("/api/reminds",remindsRouter)
app.use("/api/casihers",caishersRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    Logger.error(req, err, 100)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
