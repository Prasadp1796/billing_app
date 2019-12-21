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
        if (err) {
            if (err.name == 'ValidationError') {
                var errorMessages = err.message.replace("units validation failed:", "");
                errorMessages = errorMessages.split(',');
                for (var i = 0; i < errorMessages.length; i++) {
                    errorMessages[i] = errorMessages[i].split(':')[1];
                }
                // errorMessages = errorMessages.join(',');
                res.status(200).send({message: errorMessages});
            } else {
                res.sendStatus(500);
            }
        }

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

//Method To Update Unit Details --{Update Operation]
router.post('/manageUnits/editUnit', function (req, res) {
    unitSchema.findOneAndUpdate({UnitID: req.body.UnitID}, {$set: req.body}, {
        runValidators: true,
        context: 'query'
    }, function (err) {
        if (err) {
            if (err.name == 'ValidationError') {
                var errorMessages = err.message.replace("Validation failed:", "");
                errorMessages = errorMessages.split(',');
                for (var i = 0; i < errorMessages.length; i++) {
                    errorMessages[i] = errorMessages[i].split(':')[1];
                }
                res.status(200).send({message: errorMessages});
            } else {
                res.sendStatus(500);
            }
        } else
            res.sendStatus(201);
    })
});

//Method To Delete Unit --[Delete Operation]
router.get('/manageUnits/deleteUnit', function (req, res) {
    unitSchema.findOneAndDelete({UnitID: parseInt(req.query.UnitID)}, function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    })
});

module.exports = router;