var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var customerSchema = mongoose.Schema({
    customerName: {type: String, unique: "customer With Same customerName Already Exist"},
    EmailID: {type: String, unique: "customer With This Email ID Already Exist"},
    ContactNumber: {type: String, unique: "customer With This Contact Number Already Exist"},
    Address:{type: String},
    City:{type:String},
    State:{type:String},
    Password: String


});

//Validate Data
customerSchema.plugin(validator);

//Add Auto Increment To Event ID
customerSchema.plugin(AutoIncrement, {
    modelName: 'customer',
    type: Number,
    unique: true,
    fieldName: 'customerID'
});


module.exports = mongoose.model('customer', customerSchema);