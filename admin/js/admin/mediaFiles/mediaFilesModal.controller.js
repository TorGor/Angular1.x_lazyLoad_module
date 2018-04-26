(function() {

    angular
        .module('admin.mediaFiles')
        .controller('mediaFilesModalController', mediaFilesModalController);

    mediaFilesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'hasPower',
        'edit',
        'modalItem'
    ];

    function mediaFilesModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.edit = edit;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);
        // accept="image/jpg,image/png,image/bmp,image/jpeg"
        $scope.filesTypes = [
            {
                key:'card',
                file:'',
                tip:'392x220 png',
                type:'image/png'
            },
            {
                key:'icon',
                file:'',
                tip:'128x128 png',
                type:'image/png'
            }
        ];

        // 初始化table数据
        $scope.initMethodsNameModalData = function () {

        };

        $scope.categoryOptions = [];

        $scope.initCategoryOptions = function(){
            adminService.getReq($rootScope.URL.MEDIACATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.path||'',
                                    value:objItem.path||''
                                };
                                $scope.categoryOptions.push(tempObj)
                                console.log($scope.categoryOptions,1111)
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            console.log($scope.filesTypes,999)
            return;
            Upload.upload({
                url: $rootScope.URL.MEDIAFILES.POST,
                data: {file: file, 'category': $scope.modalItem.category}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initMethodsNameModalData();

        $scope.initCategoryOptions();

    }
})();
