var app = angular.module("manageItemsApp", ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);

app.controller("manageItemsAppCtrlr", ["$scope", "$uibModal", "$http", function ($scope, $uibModal, $http) {
    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.getItemList();
    };

    //Method To Get All Items List
    $scope.getCusList = function () {
        $http.get('/manageItem/getItemList').then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Getting Item List");
            else {
                $scope.itemList = res.data;
            }
        })
    };


    //Method To Open Model
    $scope.openModal = function (mode, data, index) {
        console.log(mode, data, index);
        let modalData = {};
        if (mode === 'edit') {
            modalData = angular.copy(data);
            modalData.index = index;
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

    //Method To Delete Item
    $scope.deleteItem = function (itemId, itemName, index) {
        alertify.confirm("Delete Item : " + itemName, function () {
            $http.get(`/manageItem/deleteItem?ItemID=${itemId}`).then(function (res) {
                if (res.status === 500)
                    alertify.error("Somthing Went Wrong While Deleting Item");
                else {
                    alertify.success("Item Deleted Successfully");
                    $scope.itemList.splice(index, 1);
                }
            })
        })
    };
}]);

//Controller For Managing Items Data
app.controller('manageItemDetails', ["$scope", "$http", "record", function ($scope, $http, record) {
    let index;
    var init = function () {
        console.log("initialized")
        $scope.item = {};
        $scope.item = record;
        index = record.index;
    };

    init();

    //Method To Add New Item
    $scope.addNewItem = function () {
        $http.post('/manageItem/addNewItem', $scope.item).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Adding New Item");
            else if (res.status === 201) {
                alertify.success("Item Added Successfully");
                $scope.itemList.push(res.data)
                $scope.close();
            }
        })
    };

    //Method To Edit Item Data
    $scope.editItem = function () {
        $http.post('/manageItem/editItem', $scope.item).then(function (res) {
            if (res.status === 500)
                alertify.error("Something Went Wrong While Updating Item Details");
            else if (res.status === 201) {
                alertify.success("Item Updated Successfully");
                $scope.getItemList();
                $scope.close()
            }
        })
    };

    //Method To Close
    $scope.close = function () {
        $scope.modalInstance.close();
    }
}]);