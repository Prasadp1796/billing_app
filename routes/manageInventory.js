const router = require('express').Router();

//Method To Render Manage Inventory Page
router.get('/manageInventory', function (req, res) {
    res.render("ManageInventory/index");
});

module.exports = router;