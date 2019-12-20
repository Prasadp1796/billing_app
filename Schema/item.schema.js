var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var itemSchema = mongoose.Schema({
    itemName: {type: String, unique: "customer With Same itemName Already Exist"},
    Quantity:{type:Number},
    Unit:{type: String},
    Rate:{type:Number},
    HSNCode:{type:String}

});

//Validate Data
itemSchema.plugin(validator);

//Add Auto Increment To Event ID
itemSchema.plugin(AutoIncrement, {
    modelName: 'customer',
    type: Number,
    unique: true,
    fieldName: 'customerID'
});


module.exports = mongoose.model('item', itemSchema);