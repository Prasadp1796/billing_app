const app = angular.module('manageUnitsApp', ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);

app.controller('manageUnitsAppCtrlr', ["$scope", "$http", "$uibModal", function ($scope, $http, $uibModal) {

    //Method To Initialize Controller
    $scope.init = function () {
        $scope.getUnitsList();
    };

    //Method To Get Units List
    $scope.getUnitsList = function () {
      $http.get('/manageUnits/getUnits').then(function (res) {
          if(res.status  === 500)
              alertify.error("Something Went Wrong While Getting Units List");
          else
              $scope.unitsList = res.data;
      })
    };

    //Method To Open Add/Edit Item Modal
    $scope.openModal = function (mode, data) {
        let modalData = {};
        if (mode === 'edit') {
            modalData = angular.copy(data);
        }
        modalData.mode = mode;

        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal.html',
            controller: 'manageItemDetails',
            scope: $scope,
            backdrop: false,
            size: 'lg',
            windowClass: 'show',
            resolve: {
                record: function () {
                    return modalData;
                }
            }
        });
    };
}]);

//Controller For Managing Item Details
app.controller('manageItemDetails', ["$scope", "$http", "record" , function ($scope, $http, record) {

    //Method To Initialize Controller
    function init(){
        $scope.unit = record;
    }
    init();

    //Method To Add New Unit
    $scope.addNewUnit = function () {
      $http.post('/manageUnits/addNewUnit', $scope.unit).then(function (res) {
          if(res.status === 500)
              alertify.error("Something Went Wrong While Adding New Unit");
          else{
              alertify.success("Unit Added Successfully...");
              $scope.close();
              $scope.getUnitsList();
          }
      })
    };

    //Method To Close Modal
    $scope.close = function () {
        $scope.modalInstance.close();
    }
}]);