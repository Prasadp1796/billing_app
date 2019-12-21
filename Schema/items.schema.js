var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var itemSchema = mongoose.Schema({
    Name: {type: String, unique: "customer With Same itemName Already Exist"},
    Quantity:{type:Number},
    UnitID:{type: Number},
    Rate:{type:Number},
    HSNCode:{type:String}

});

//Validate Data
itemSchema.plugin(validator);

//Add Auto Increment To Event ID
itemSchema.plugin(AutoIncrement, {
    modelName: 'items',
    type: Number,
    unique: true,
    fieldName: 'ItemID'
});


module.exports = mongoose.model('items', itemSchema);