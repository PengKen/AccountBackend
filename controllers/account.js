/**
 * @method
 * @desc 账单控制器
 * @param req.body {  phone,  password, deviceInfo:{ipAddress，} }
 * @param res
 * @param next
 */
const moment = require('moment');
const path = require('path')
const Account = require('../models').Accounts
const User = require('../models').Users
const logger = require('../log/index')
const Excel = require('exceljs');
function mapBase64ToPhoto(imgs,res) {
    var imageUrls = []
    imgs.map(function (img) {
        var binaryData=new Buffer.from(img.data,'base64').toString('binary')
        const newImageName = `/${moment().valueOf()}_${img.name}`
        require('fs').writeFileSync(path.resolve(__dirname,'../','upload-IMGs','images') + newImageName ,binaryData,'binary')
        imageUrls.push('http://localhost:3000/images' + newImageName    )

    })
    console.log(imageUrls)
    return imageUrls
}
exports.getAccountsInfo = function (req,res,next) {

    // 需要删选的货物名称
    var cargoNamesList = []
    if(req.query.cargoNames){
        console.log(123,req.query.cargoNames)
        cargoNamesList = req.query.cargoNames.split('_')
    }
    switch (req.query.type) {
        case undefined :
             break;
        case 'recently' :
            Account.searchAccounts(req.params.id,function (accounts) {
                var recentlyAccount = []
                var timeLength = 3 // recently表示最近三天
                var minDay = moment().subtract(timeLength, 'days').format('YYYY-M-D HH:mm:ss')
                accounts.forEach(function (account) {
                    if (moment(minDay).isBefore(account.date)) {
                        recentlyAccount.push({...account,accountId:account._id})
                    }
                })
                // 按时间从晚到早排序
                recentlyAccount.sort(function (a,b) {
                    return a.date < b.date
                })
                res.send(recentlyAccount)
            },function (errorMessage) {
                res.send(errorMessage)
            })
            return
        default :
        res.status(400).send({errorMessage:'参数错误!'})
    }

    switch (req.query.specificTime) {
        case undefined :
            break;
        case 'three_weeks':
             Account.searchAccounts(req.params.id,function (accounts) {
                 var specificAccounts = []
                 var today = new Date().getDay() //查看今天周几
                 var timeLength = 2 * 7 + (today || 7) //时间跨度为2周加上此周,0表示周日
                 var minDay = moment().subtract(timeLength, 'days').format('YYYY-M-D HH:mm:ss')
                accounts.forEach(function (account, index, array) {
                     if (moment(account.date).isAfter(minDay)) {
                         specificAccounts.push(account)
                     }
                 })
                 // 按时间从晚到早排序
                 specificAccounts.sort(function (a,b) {
                     return a.date < b.date
                 })
                 res.send(specificAccounts)
             },function (errorMessage) {
                 res.send(errorMessage)
             })
            break;
        case 'current_month':
            Account.searchAccounts(req.params.id,function (accounts) {
                var specificAccounts = []
                var maxDay = moment().endOf('month')
                var minDay = moment().startOf("month")

                accounts.forEach(function (account, index, array) {


                    if (moment(account.date).isBefore(maxDay) && moment(account.date).isAfter(minDay)) {
                        if(cargoNamesList.length > 0){
                            if(account.cargoName in cargoNamesList){
                                // do nothing
                            }else{
                                return
                            }
                        }
                        specificAccounts.push(account)
                    }
                })

                // 按时间从晚到早排序
                specificAccounts.sort(function (a,b) {
                    return a.date < b.date
                })

                res.send(specificAccounts)
            },function (errorMessage) {
                res.send(errorMessage)
            })

            break;

        case 'current_week':
            Account.searchAccounts(req.params.id,function (accounts) {
                var specificAccounts = []
                var maxDay = moment().endOf('week')
                var minDay = moment().startOf("week")

                accounts.forEach(function (account, index, array) {

                    if (moment(account.date).isBefore(maxDay) && moment(account.date).isAfter(minDay)) {
                        if(cargoNamesList.length > 0){
                            if(account.cargoName in cargoNamesList){
                                // do nothing
                            }else{
                                return
                            }
                        }
                            specificAccounts.push(account)
                    }
                })

                specificAccounts.sort(function (a,b) {
                    return a.date < b.date
                })

                res.send(specificAccounts)
            },function (errorMessage) {
                res.send(errorMessage)
            })
            break;


    }

}
    exports.addAccount = function (req,res,next) {

    const imageUrls = mapBase64ToPhoto(req.body.data.images,res)
    delete req.body.data.images
    var account = new Account({...req.body.data,imageUrls})
        console.log(account)
    Account.add(req.body.personalInfo.userId,account,function (result) {
        if(result.errorMessage)
            res.send({errorMessage:result.errorMessage})
        else
            res.send({message:'ok'})
    })

}


exports.saveToExcel = function (req,res,next) {
    const priceArea = [[2000,4000],[5000,7000],[6500,8000],[7000,8000]]
    const cargoA = []
    const cargoB = []
    const cargoC = []
    const cargoD = []
    var data = []
    for(var i = 1; i <= 500 ;i++){
        var userId = ''
        for(var k = 0; k < 12; k++) {
            userId += Math.round(0 + Math.random() * 10)
        }
        // 首付率
        var lastMonthPayRate = Math.random()

        // 欠款数额
        var needPayMoney = (0 + Math.random() * 10000000).toFixed(2)

        // 交易总量
        var totalPrice = (0 + Math.random() * 100000000).toFixed(2)

        // 平均补足尾款的时间

        var payAllMoneyday = (Math.round(0 + Math.random() * 30))


        // 库存

        var amount = (Math.round(0 + Math.random() * 300))

        // 经营能力级别

        var rank = 0
        var score = 0

        if(lastMonthPayRate < 0.3) score = 0.2
        if(lastMonthPayRate >= 0.3 && lastMonthPayRate < 0.8) score = 0.3
        if(lastMonthPayRate >= 0.8) score = 0.5

        if(needPayMoney < 10000 && lastMonthPayRate > 0.6) score += 0.15
        if(needPayMoney < 10000 && lastMonthPayRate <= 0.6) score -= 0.1

        if(needPayMoney >= 10000 && needPayMoney < 100000 && lastMonthPayRate > 0.5 ) score += 0.11
        if(needPayMoney >= 10000 && needPayMoney < 100000 && lastMonthPayRate <= 0.5 ) score += 0.01

        if(needPayMoney >= 100000 && needPayMoney < 10000000 && lastMonthPayRate > 0.3 ) score += 0.09
        if(needPayMoney >= 100000 && needPayMoney < 10000000 && lastMonthPayRate < 0.3 ) score += 0.08



        if(totalPrice <= 100000 && lastMonthPayRate >= 0.5) score += 0.13
        if(totalPrice <= 100000 && lastMonthPayRate < 0.5) score -= 0.1

        if(totalPrice > 100000 && totalPrice <= 5000000 && lastMonthPayRate >= 0.3) score += 0.15
        if(totalPrice > 100000 && totalPrice <= 5000000 && lastMonthPayRate < 0.3) score += 0.08

        if(totalPrice > 500000 && totalPrice <= 50000000 && lastMonthPayRate >= 0.25) score += 0.08
        if(totalPrice > 500000 && totalPrice <= 50000000 && lastMonthPayRate < 0.25) score += 0.05
        if(totalPrice > 5000000 && totalPrice <= 100000000 && lastMonthPayRate >= 0.22) score += 0.1
        if(totalPrice > 5000000 && totalPrice <= 100000000 && lastMonthPayRate < 0.22) score += 0.03


        if(payAllMoneyday <= 7) score += 0.13
        if(payAllMoneyday > 7 && payAllMoneyday <= 15) score += 0.1
        if(payAllMoneyday >15 && payAllMoneyday <= 30) score += 0.05



        if(amount < 100) score += 0.04

        if(amount > 100 && amount <= 200) score += 0.08

        if(amount > 200 && amount <= 300) score += 0.1

        if(score >= 0.9) rank = 5
        if(score > 0.8 && score < 0.9) rank = 4
        if(score > 0.6 && score <= 0.8) rank = 3
        if(score > 0.4 && score <= 0.6) rank = 2
        if(score <= 0.4) rank = 1

        data.push({
            lastMonthPayRate,
            amount,
            needPayMoney,
            totalPrice,
            payAllMoneyday,
            rank,
            score
        })



    }







        // var price = Math.round(1000 + Math.random() * 5000) ;
        // var amount = Math.round(1 + Math.random() * 20000)
        // var totalPrice = (price * amount/ 1000).toFixed(2)
        // var havePay = (totalPrice) *(0.3 +  Math.random() * 0.9).toFixed(2)
        // var needPay = totalPrice - havePay
        // var date = `2018-${Math.round(1 + Math.random() * 12)}-${Math.round(1 + Math.random() * 28)}`
        // console.log(date.split('-'))
        // var payAllMoneyDate = moment(date.split('-')).add(Math.round(1 + Math.random() * 60), 'days').format('YYYY-M-D')
        //
        // data.push({
        //     cargoName,
        //     amount,
        //     price,
        //     totalPrice,
        //     havePay,
        //     needPay,
        //     date,
        //     // transactionType,
        //     payAllMoneyDate
        // })




    var start_time = new Date();
    var workbook = new Excel.stream.xlsx.WorkbookWriter({
        filename: './streamed-workbook.xlsx'
    });
    var worksheet = workbook.addWorksheet('Sheet');

    worksheet.columns = [
        { header: '上月平均首付率', key: 'lastMonthPayRate' },
        { header: '交易总量', key: 'amount' },
        { header: '总价（元）', key: 'totalPrice' },
        { header: '平均补足尾款时间（天）', key: 'payAllMoneyday' },
        { header: '未还（元）', key: 'needPayMoney' },
        { header: '经营能力', key: 'rank' },
        { header: '分数', key: 'score' },
    ];


    var length = cargoA.length;

// 当前进度
    var current_num = 0;
    var time_monit = 400;
    var temp_time = Date.now();

    console.log('开始添加数据');
// 开始添加数据
    for(let i in data) {
        worksheet.addRow(data[i]).commit();
        current_num = i;
        if(Date.now() - temp_time > time_monit) {
            temp_time = Date.now();
            console.log((current_num / length * 100).toFixed(2) + '%');
        }
    }
    console.log('添加数据完毕：', (Date.now() - start_time));
    workbook.commit();

    var end_time = new Date();
    var duration = end_time - start_time;

    console.log('用时：' + duration);
    console.log("程序执行完毕");
    res.send("转换完毕，用时" + duration + '毫秒')

}