(function () {

    angular
        .module('admin.mediaFiles')
        .controller('mediaFilesViewModalController', mediaFilesViewModalController);

    mediaFilesViewModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'modalItem'
    ];

    function mediaFilesViewModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        modalItem
    ) {

        $scope.files = modalItem.files;

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

    }
})();
