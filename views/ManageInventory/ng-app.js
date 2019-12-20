const app = angular.module('manageInventoryApp', ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);

app.controller('manageInventoryAppCtrlr', ["$scope", "$http", "$uibModal", function ($scope, $http, $uibModal) {

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
}]);

//Controller For Managing Item Details
app.controller('manageItemDetails', ["$scope", "$http", "record" , function ($scope, $http, record) {

    //Method To Initialize Controller
    function init(){
        $scope.item = record;
    }
    init();

    //Method To Close Modal
    $scope.close = function () {
        $scope.modalInstance.close();
    }
}]);