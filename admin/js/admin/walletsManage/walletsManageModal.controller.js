(function() {

    angular
        .module('admin.walletsManage')
        .controller('walletsManageModalController', walletsManageModalController);

    walletsManageModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'modalItem',
        'edit',
        'hasPower',
        '$translate'
    ];

    function walletsManageModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        modalItem,
        edit,
        hasPower,
        $translate
    ) {

        $scope.edit = edit;

        $scope.hasPower = hasPower;

        if(edit == 3||edit ==1){
            $scope.modalItem = angular.copy(modalItem)
        }else{
            $scope.modalItem = {
                name: [],
                brands: [],
                syncPassword: $scope.booleanOptons[0] && $scope.booleanOptons[0].value || '',
                disabled: $scope.booleanOptons[1] && $scope.booleanOptons[1].value || '',
                status: $scope.statusOptons[0] && $scope.statusOptons[0].value || '',
                code:'',
                apiEndpoint:'',
                usernamePrefix:'',
                apkCode:'',
                recordsDuration: '',
                recordsParamsTimeFormat: ''
            };
        }

        if($scope.modalItem.recordsParamsTimeZone){
            delete $scope.modalItem.recordsParamsTimeZone
        }

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectBrands = function(value, $event) {
            if($event.target.checked){
                if($scope.modalItem.brands.indexOf(value) === -1){
                    $scope.modalItem.brands.push(value)
                }
            }else{
                $scope.modalItem.brands.splice($scope.modalItem.brands.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showNameModal = [];
        $scope.nameModalReload = 1;
        $scope.nameModalAoData = {};
        $scope.nameModalSearch = '';

        // 初始化table数据
        $scope.initNameModalData = function () {
            $scope.modalItem['name'].forEach(function (nameItem, nameIndex) {
                nameItem.id = nameIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param nameModal name数据对象
         * @param data
         */

        $scope.saveNameModal = function (nameModal, data) {
            $scope.modalItem['name'].forEach(function (nameModalItem) {
                if(nameModalItem.id == nameModal.id){
                    window.Object.assign(nameModalItem, data);
                    if($scope.validIsNew(nameModalItem.id)){
                        nameModalItem.id = window.parseInt(nameModalItem.id, 10)
                        $scope.nameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param nameModal name数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteNameModal = function (nameModal, index) {
            $scope.modalItem['name'].splice(index, 1)
        };

        // 添加按钮
        $scope.addNameModal = function () {
            $scope.nameModalAoData = {};
            $scope.nameModalSearch = '';
            $scope.modalItem['name'].unshift({
                'id': ($scope.modalItem['name'].length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param NameItem name项目
         * @param index 添加的index
         */

        $scope.cancelSaveNameModal = function (NameItem, index) {
            if ($scope.validIsNew(NameItem.id)) {
                $scope.modalItem['name'].splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if($scope.modalItem.name && $scope.modalItem.name.length){
                var tempObj = {};
                var sameKey = false;
                $scope.modalItem.name.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local, just remove one');
                    return '';
                }
            }
            var tempData = angular.copy($scope.modalItem);
            tempData['name'] = tempData['name'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['name'])){
                tempData['name'].forEach(function(nameItem) {
                    if(nameItem.id){
                        delete nameItem.id;
                    }
                })
            }
            if(tempData.name && tempData.name.length){
                var tempNameObj = {};
                tempData.name.map(function(nameItem) {
                    tempNameObj[nameItem.locale] = nameItem.value
                });
                tempData.name = angular.copy(tempNameObj)
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.WALLETSMANAGE.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (edit==3) {
                adminService.patchReq($rootScope.URL.WALLETSMANAGE.PATCH+'/'+tempData.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('success');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数
        $scope.initNameModalData();

    }
})();
