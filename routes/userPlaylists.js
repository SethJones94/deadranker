var express = require('express');
var router = express.Router();

/* GET about page. */

router.get('/', function(req, res, next){
	res.send('working userPlaylist');
})

module.exports = router;