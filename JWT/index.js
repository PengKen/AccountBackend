const secret = 'WeAccount application token secret'
var jwt = require('jsonwebtoken');

async function jwtSign(payload) {
    return new Promise(function (resolve,reject) {
        jwt.sign(payload,secret,{ expiresIn: '2 days'},function (err,token) {
            if(err) console.log(err)
            resolve(token)
        }) // 2 day
    })

}

async function jwtVerify(token,res,req) {
    jwt.verify(token,secret, async function (err,decoded) {
        if(err) {
            console.log(err)
            res.status(403).send({errorMessage:'身份失效，请重新登录'})
            return
        }
        const token =   jwt.sign(Object.assign({},{a:decoded.a}),secret,{ expiresIn: '2 days'});
        // const token = await jwtSign(Object.assign({},{a:decoded.a}));
        console.log("set",req.originalUrl);
        res.header('Auth',token)
    })
}

function jwtHeartBeat(token,res){
    var decoded = jwt.verify(token,res);
    jwtSign(decoded.token).then(newToken => res.send(newToken))


}


module.exports = {
    jwtSign,
    jwtHeartBeat,
    jwtVerify
}