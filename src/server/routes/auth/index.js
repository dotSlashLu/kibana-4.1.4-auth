var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.post('/login', require("./login"));
router.get('/logout', require("./logout"));

module.exports = router;
