var log4js = require("log4js");
var path = require("path");
var fs = require("fs");
var basePath = path.resolve(__dirname, "");

var errorPath = basePath + "/errors"; //request-error
var resPath = basePath + "/responses"; //response-error
var DBerrorPath =  basePath + '/DBerrors'
var errorFilename = errorPath + "/error";
var resFilename = resPath + "/response";
var DBerrFilename = DBerrorPath + '/DBerr'
/**
 * 确定目录是否存在，如果不存在则创建目录
 */
var confirmPath = function(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log("createPath: " + pathStr);
    }
};
log4js.configure({
    appenders: {
        errorLog: {
            type: "dateFile", //日志类型
            filename: errorFilename, //日志输出位置
            alwaysIncludePattern: true, //是否总是有后缀名
            pattern: "-yyyy-MM-dd.log" //后缀，每小时创建一个新的日志文件
        },
        responseLog: {
            type: "dateFile",
            filename: resFilename,
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd.log"
        },
        DBerrLog:{
            type: "dateFile",
            filename: DBerrFilename,
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd.log"
        }
    },
    categories: {
        errorLog: { appenders: ['errorLog'], level: 'error' },
        DBerrLog :{ appenders:['DBerrLog'], level: 'error'},
        responseLog: { appenders: ["responseLog"], level: "info" },
        default: { appenders: ['responseLog','errorLog',], level: 'trace' }
    },
    // pm2: true,
    // pm2InstanceVar: 'INSTANCE_ID',
    disableClustering: true
});
//创建log的根目录'logs'
if (basePath) {
    confirmPath(basePath);
    //根据不同的logType创建不同的文件目录
    confirmPath(errorPath);
    confirmPath(resPath);
}

module.exports = log4js;