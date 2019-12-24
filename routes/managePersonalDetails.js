const router = require('express').Router();

//Method To Render Manage Personal Details
router.get('/managePersonalDetails', function (req, res) {
    res.render("ManagePersonalDetails/index");
});

//Method To Get Personal Details
router.get('/managePersonalDetails/getPersonalDetails', function (req, res) {

});

//Method To Save Or Update Personal Details
router.post('/managePersonalDetails/savePersonalDetails', function (req, res) {

});

module.exports = router;