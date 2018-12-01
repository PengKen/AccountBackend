const secret = 'WeAccount application token secret'
var jwt = require('jsonwebtoken');

function jwtSign(payload) {
    return new Promise(function (resolve,reject) {
        jwt.sign(payload,secret,{ expiresIn: '2 days'},function (err,token) {
            if(err) console.log(err)
            resolve(token)
        }) // 2 day
    })

}

async function jwtVerify(token,res) {
    jwt.verify(token,secret,function (err,decoded) {
        if(err) {
            console.log(err)
            res.status(403).send({errorMessage:'身份失效，请重新登录'})
            return
        }
        console.log(decoded)
         jwtSign(Object.assign({},{a:decoded.a})).then(token => res.header('Auth',token))

    })
}

function jwtHeartBeat(token,res){
    var decoded = jwt.verify(token,res)
    jwtSign(decoded.token).then(newToken => res.send(newToken))


}


module.exports = {
    jwtSign,
    jwtHeartBeat,
    jwtVerify
}