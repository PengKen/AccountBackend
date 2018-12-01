var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("a")
    res.send("456")
    next()
});

router.get('/a',function (req,res,next) {
    res.send('213')
})
module.exports = router;
