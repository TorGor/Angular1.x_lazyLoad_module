(function () {

    angular
        .module('admin.mediaFiles')
        .controller('mediaFilesModalController', mediaFilesModalController);

    mediaFilesModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'Upload',
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
        Upload,
        adminService,
        hasPower,
        edit,
        modalItem
    ) {

        $scope.uploadStatus=false;
        $scope.edit = edit;
        $scope.hasPower = hasPower;
        $scope.modalItem = angular.copy(modalItem);
        $scope.modalItem.category = '';
        $scope.modalItem.locale = '';

        // accept="image/jpg,image/png,image/bmp,image/jpeg"
        $scope.filesTypesOptions = {
            'game': [
                        {
                            key: 'card',
                            file: '',
                            tip: '392x220 png',
                            type: 'image/png'
                        },
                        {
                            key: 'icon',
                            file: '',
                            tip: '128x128 png',
                            type: 'image/png'
                        }
                    ],
            'spot': [
                        {
                            key: 'spot',
                            file: '',
                            tip: '1600x740 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: 'blur',
                            file: '',
                            tip: '2560x770 jpg',
                            type: 'image/jpg'
                        }
                    ],
            'menu': [
                        {
                            key: 'bg',
                            file: '',
                            tip: '716x550 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: 'collection',
                            file: '',
                            tip: '196x330 jpg png',
                            type: 'image/jpg,image/png'
                        }
                    ],
            'promotion': [
                        {
                            key: '1060',
                            file: '',
                            tip: '2120x160 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: '919',
                            file: '',
                            tip: '1838x320 jpg',
                            type: 'image/jpg'
                        },
                        {
                            key: '749',
                            file: '',
                            tip: '196x330',
                            type: '1498x320 jpg'
                        }
                    ],
        };

        $scope.localesOptions = [];

        $scope.initLocalesOptionsData = function () {
            $scope.localesOptions = [];
            adminService.getReq($rootScope.URL.LOCALELANGUAGE.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.code||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.localesOptions.push(tempObj)
                                }
                            })
                        }
                        $scope.modalItem.locale = $scope.localesOptions[0]&&$scope.localesOptions[0].code;
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.addMenuMediaFilesType = function(){
            console.log($scope.modalItem.locale)
            if($scope.modalItem.locale){
                $scope.filesTypes.push({
                    key: $scope.modalItem.locale,
                    file: '',
                    tip: '285x170 png',
                    type: 'image/png'
                })
            }
        };

        // 初始化table数据
        $scope.initFilesTypes = function () {
            $scope.filesTypes = angular.copy($scope.filesTypesOptions[$scope.modalItem.category])
        };

        $scope.categoryOptions = [];

        $scope.initCategoryOptions = function () {
            adminService.getReq($rootScope.URL.MEDIACATEGORIES.GET, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if (window.Array.isArray(res.data.data)) {
                            res.data.data.map(function (objItem) {
                                var tempObj = {
                                    label: objItem.path || '',
                                    value: objItem.path || ''
                                };
                                $scope.categoryOptions.push(tempObj);
                                $scope.initFilesTypes();
                            })
                        }
                        $scope.modalItem.category = $scope.categoryOptions[0].value;
                        $scope.initFilesTypes();
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        //$rootScope.toasterSuccess(res.data.msg);;
        $scope.confirmModal = function () {
            var requireVaild = false;
            var tempObj = {};
            $scope.filesTypes.forEach(function (item) {
                if(item.file === ''){
                    requireVaild = true
                }else{
                    tempObj[item.key] = item.file
                }
            });
            if(requireVaild&&['game','promotion'].indexOf($scope.modalItem.category)!==-1){
                $rootScope.alertErrorMsg('image should upload at one time');
                return;
            }
            Upload.upload({
                url: $rootScope.URL.MEDIAFILES.POST,
                data: {'category': $scope.modalItem.category,'image':tempObj}
            }).then(function (resp) {
                $scope.uploadStatus=true;
                console.log('Success uploaded Response: ' + resp);
            }, function (resp) {
                $scope.uploadStatus=true;
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                $scope.uploadStatus=true;
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initCategoryOptions();

        $scope.initLocalesOptionsData();

    }
})();
