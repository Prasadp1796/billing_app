const router = require('express').Router();

//city state country import
const dropdown = require('countrycitystatejson');

//method to fetch country
router.get('/fetchCountries', function (req, res) {
    res.send(dropdown.getCountries());
});

//method to fetch state
router.get('/fetchStates', function (req, res) {
    var shortName = req.query.countryShortName;
    res.send(dropdown.getStatesByShort(shortName));
});

//method to fetch cities
router.get('/fetchCities', function (req, res) {
    var shortName = req.query.countryShortName;
    var stateName = req.query.stateName;
    res.send(dropdown.getCities(shortName, stateName));
});

module.exports = router;