var express    = require("express"),
	router     = express.Router();

router.get('/', function (request, response) {
    response.render('../views/index');
});

module.exports = router;