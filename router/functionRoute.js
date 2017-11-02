var router = require('express').Router();
var FunctionContoller = require('../controller/functionController');

var bodyparser = require('body-parser').json();


router.post('/postfilter',bodyparser, FunctionContoller.GetProtocols);
router.post('/postreports',bodyparser, FunctionContoller.GerReports);

module.exports = router;