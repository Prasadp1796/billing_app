const router = require('express').Router();

let unitSchema = require('../Schema/units.schema');

//Method To Render Manage Units Page
router.get('/manageUnits', function (req, res) {
    res.render("ManageUnits/index");
});

//Method To Add New Unit --{Create Operation]
router.post('/manageUnits/addNewUnit', function (req, res) {
    let newUnit = new unitSchema(req.body);
    newUnit.save(function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    });
});

//Method To Get Unit List --[Read Operation]
router.get('/manageUnits/getUnits', function (req, res) {
    unitSchema.find({}, {_id: 0, __v: 0}, function (err, units) {
        if (err)
            res.sendStatus(500);
        else
            res.send(units);
    })
});


module.exports = router;