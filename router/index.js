var functionRouter = require('./functionRoute');
var router = require('express').Router();

router.use('/api/Function', functionRouter);
//router.use('/api/GetFilterReoprts', functionRouter.get);

module.exports = router;