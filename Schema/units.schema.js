var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var unitSchema = mongoose.Schema({
    Name: {type: "String", unique: "The Unit With Same Name Already Exist"},
    Symbol: {type: "String"}
});

//Validate Data
unitSchema.plugin(validator);

//Add Auto Increment To Event ID
unitSchema.plugin(AutoIncrement, {
    modelName: 'units',
    type: Number,
    unique: true,
    fieldName: 'UnitID'
});


module.exports = mongoose.model('units', unitSchema);