const app = angular.module('manageInventoryApp', ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);

app.controller('manageInventoryAppCtrlr', ["$scope", "$http", "$uibModal", function ($scope, $http, $uibModal) {

    //Method To Initialize Controller
    $scope.init = function () {
        $scope.getItemsList();
        $scope.getUnitsList();
    };

    //Method To Get Units List
    $scope.getItemsList = function () {
        $http.get('/manageItems/getItems').then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Getting Items List");
            else
                $scope.itemsList = res.data;
        })
    };

    //Method To Get Units List
    $scope.getUnitsList = function () {
      $http.get('/manageInventory/getUnitsList').then(function (res) {
          if(res.status === 500)
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
            templateUrl: 'itemModal',
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
    $scope.deleteItem = function (unitId) {
        alertify.confirm("Do you really want to delete this item?", function () {
            $http.get('/manageItems/deleteItem?ItemID='+unitId).then(function (res) {
                if(res.status === 500)
                    alertify.error("Something Went Wrong While Deleting Item");
                else{
                    alertify.success("Item Deleted Successfully");
                    $scope.getItemsList();
                }
            })
        })
    };
}]);

//Controller For Managing Item Details
app.controller('manageItemDetails', ["$scope", "$http", "record" , function ($scope, $http, record) {

    //Method To Initialize Controller
    function init(){
        $scope.item = record;
    }
    init();

    //Method To Add New Item
    $scope.addNewItem = function () {
        $scope.isPosting = true;
        $http.post('/manageItems/addNewItem', $scope.item).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Adding New Item");
            else if (res.status === 201) {
                $scope.isPosting = false;
                alertify.success("Item Added Successfully...");
                $scope.close();
                $scope.getItemsList();
            } else {
                $scope.isPosting = false;
                $scope.errorMessages = res.data.message;
            }
        });
    };

    //Method To Edit Item Details
    $scope.editItem = function () {
        $scope.isPosting = true;
        $http.post('/manageItems/editItem', $scope.item).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Updating Item Details");
            else if (res.status === 201) {
                $scope.isPosting = false;
                alertify.success("Item Details Updated Successfully...");
                $scope.close();
                $scope.getItemsList();
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