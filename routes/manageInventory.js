const router = require('express').Router();

let unitSchema = require('../Schema/units.schema');
let itemSchema = require('../Schema/items.schema');

//Method To Render Manage Inventory Page
router.get('/manageInventory', function (req, res) {
    res.render("ManageInventory/index");
});

//Method To Get Items List
router.get('/manageInventory/getUnitsList', function (req, res) {
    unitSchema.find({}, {_id: 0, __v: 0}, function (err, units) {
        if (err)
            res.sendStatus(500);
        else
            res.send(units);
    })
});


//Method To Add New Item --{Create Operation]
router.post('/manageItems/addNewItem', function (req, res) {
    let newItem = new itemSchema(req.body);
    newItem.save(function (err) {
        if (err) {
            if (err.name == 'ValidationError') {
                var errorMessages = err.message.replace("items validation failed:", "");
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

//Method To Get Item List --[Read Operation]
router.get('/manageItems/getItems', function (req, res) {
    itemSchema.aggregate([
        {
            $lookup: {
                from: 'units',
                localField: 'UnitID',
                foreignField: 'UnitID',
                as: 'unit'
            }
        },
        {
            $project: {
                _id: 0,
                "Name": 1,
                "Rate": 1,
                "HSNCode": 1,
                "Quantity": 1,
                "UnitID": 1,
                "ItemID": 1,
                "UnitName": {$arrayElemAt: ["$unit.Name", 0]},
                "UnitSymbol": {$arrayElemAt: ["$unit.Symbol", 0]}
            }
        }
    ]).exec(function (err, items) {
        if (err)
            res.sendStatus(500);
        else
            res.send(items)
    })
});

//Method To Update Item Details --{Update Operation]
router.post('/manageItems/editItem', function (req, res) {
    itemSchema.findOneAndUpdate({ItemID: req.body.ItemID}, {$set: req.body}, {
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

//Method To Delete Item --[Delete Operation]
router.get('/manageItems/deleteItem', function (req, res) {
    itemSchema.findOneAndDelete({ItemID: parseInt(req.query.ItemID)}, function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    })
});

module.exports = router;