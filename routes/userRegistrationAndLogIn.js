const router = require('express').Router();

//Method To Render Log In Page
router.get('/login', function (req, res) {
    res.render("LogIn/index");
});

module.exports = router;