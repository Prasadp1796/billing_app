const app = angular.module('managePersonalDetailsApp', ['ngMessages', 'ngSanitize', 'ui.bootstrap', 'ui.select', 'ui.bootstrap.modal']);

app.controller('managePersonalDetailsAppCtrlr', ["$scope", "$http", "$uibModal", function ($scope, $http, $uibModal) {
    //Method To Initialize Controller
    $scope.init = function () {
        // $http.get('')
        //Method To Fetch Countries List
        $http.get('/fetchCountries', $scope.customer).then(function (response) {
            $scope.data = {}
            $scope.countries = response.data;
            console.log($scope.countries[0])
        });
    };

    //Method Called When Country Is Selected
    $scope.onCountrySelected = function (data) {
        console.log(data)
        $scope.data.Country = data.name;
        $scope.countryShortName = data.shortName;
        // console.log($scope.data, countryShortName)
        // console.log($scope.Country.selected)
        // $scope.branchOffice.BranchOfficeCountry = data.name;
        // $scope.CountryShortName = data.shortName;
        //Method To Get Countries
        $http.get('/fetchStates?countryShortName=' + data.shortName).then(function (response) {
            console.log(response.data);
            $scope.states = response.data;
        })
    };

    //Method Called When State Is Selected
    $scope.onStateSelected = function (data) {
        $scope.data.State = data;
        //Method To Get All Cities
        $http.get('/fetchCities?countryShortName=' + $scope.countryShortName + '&stateName=' + $scope.data.State).then(function (response) {
            // console.log("Cities", response.data, '/fetchCities?countryShortName=' + $scope.branchOffice.BranchOfficeCountry + '&stateName=' + $scope.branchOffice.BranchOfficeState);
            $scope.citiesList = response.data;
        })
    };

    //Method Called When City Is Selected
    $scope.onCitySelected = function (data) {
        $scope.data.City = data;
        // $scope.branchOffice.BranchOfficeCity = data;
    };

    //Method To Save Personal Details 
    $scope.saveDetails = function () {
        console.log($scope.Country)
        console.log($scope.data)
    };

}]);