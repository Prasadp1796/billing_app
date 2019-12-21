const app = angular.module('manageUnitsApp', ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);

app.controller('manageUnitsAppCtrlr', ["$scope", "$http", "$uibModal", function ($scope, $http, $uibModal) {

    //Method To Initialize Controller
    $scope.init = function () {
        $scope.getUnitsList();
    };

    //Method To Get Units List
    $scope.getUnitsList = function () {
        $http.get('/manageUnits/getUnits').then(function (res) {
            if (res.status === 500)
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
    
    //Method To Delete Unit
    $scope.deleteUnit = function (unitId) {
      alertify.confirm("Do you really want to delete this unit?", function () {
          $http.get('/manageUnits/deleteUnit?UnitID='+unitId).then(function (res) {
              if(res.status === 500)
                  alertify.error("Something Went Wrong While Deleting Unit");
              else{
                  alertify.success("Unit Deleted Successfully");
                  $scope.getUnitsList();
              }
          })
      })
    };
}]);

//Controller For Managing Item Details
app.controller('manageItemDetails', ["$scope", "$http", "record", function ($scope, $http, record) {

    //Method To Initialize Controller
    function init() {
        $scope.unit = record;
    }

    init();

    //Method To Add New Unit
    $scope.addNewUnit = function () {
        $scope.isPosting = true;
        $http.post('/manageUnits/addNewUnit', $scope.unit).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Adding New Unit");
            else if (res.status === 201) {
                $scope.isPosting = false;
                alertify.success("Unit Added Successfully...");
                 $scope.close();
                $scope.getUnitsList();
            } else {
                $scope.isPosting = false;
                $scope.errorMessages = res.data.message;
            }
        });
    };

    //Method To Edit Unit Details
    $scope.editUnit = function () {
        $scope.isPosting = true;
        $http.post('/manageUnits/editUnit', $scope.unit).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Updating Unit Details");
            else if (res.status === 201) {
                $scope.isPosting = false;
                alertify.success("Unit Details Updated Successfully...");
                $scope.close();
                $scope.getUnitsList();
            } else {
                $scope.isPosting = false;
                $scope.errorMessages = res.data.message;
            }
        });
    };

    //Method To Close Modal
    $scope.close = function () {
        $scope.modalInstance.close();
    }
}]);