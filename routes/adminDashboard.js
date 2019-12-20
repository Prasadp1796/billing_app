const router = require('express').Router();

//Method To Render Admin Dashboard Page
router.get('/adminDashboard', function (req, res) {
    res.render("AdminDashboard/index");
});

module.exports = router;