var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.post('/login', require("./login"));

module.exports = router;
