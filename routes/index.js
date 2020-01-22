var express    = require("express"),
	router     = express.Router();

router.get('/', middleware.isLoggedIn, function (request, response) {
    response.render('../views/hello.html');
});

module.exports = router;