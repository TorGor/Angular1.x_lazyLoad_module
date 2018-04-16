(function() {

    angular
        .module('admin.gamesManage')
        .controller('addGamesController', addGamesController);

    addGamesController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'gamesItem',
        'edit',
        'hasPower',
        '$translate'
    ];

    function addGamesController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        gamesItem,
        edit,
        hasPower,
        $translate
    ) {

        $scope.edit = edit;

        $scope.hasPower = hasPower;

        if(edit == 3||edit ==1){
            $scope.gamesItem = angular.copy(gamesItem)
        }else{
            $scope.gamesItem = {
                name: [],
                productCode: $scope.productOptions[0] && $scope.productOptions[0].value || '',
                brandCode: $scope.brandOptions[0] && $scope.brandOptions[0].value || '',
                flashCode:'',
                html5Code:'',
                appCode:'',
                apkCode:'',
                windowsCode: '',
                ftpCode: '',
                flashDemoSupported: '',
                html5DemoSupported: '',
                image: '',
                lines: '',
                hasJackpot: '',
                currentJackpot: '',
                disabled: false,
                rebateable: $scope.booleanOptons[1].value,
                bigwinable: '',
                categories: [],
                isNew: '',
                isComingSoon: '',
                isRecommend: ''
            };
        }

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectCategories = function(value, $event) {
            if($event.target.checked){
                if($scope.gamesItem.categories.indexOf(value) === -1){
                    $scope.gamesItem.categories.push(value)
                }
            }else{
                $scope.gamesItem.categories.splice($scope.gamesItem.categories.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showNameModal = [];
        $scope.nameModalReload = 1;
        $scope.nameModalAoData = {};
        $scope.nameModalSearch = '';

        // 初始化table数据
        $scope.initNameModalData = function () {
            $scope.gamesItem['name'].forEach(function (nameItem, nameIndex) {
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
            $scope.gamesItem['name'].forEach(function (nameModalItem) {
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
            $scope.gamesItem['name'].splice(index, 1)
        };

        // 添加按钮
        $scope.addNameModal = function () {
            $scope.nameModalAoData = {};
            $scope.nameModalSearch = '';
            $scope.gamesItem['name'].unshift({
                'id': ($scope.gamesItem['name'].length+1) + 'null',
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
                $scope.gamesItem['name'].splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            if(!($scope.gamesItem.flashCode || $scope.gamesItem.html5Code || $scope.gamesItem.appCode || $scope.gamesItem.apkCode || $scope.gamesItem.windowsCode)){
                $rootScope.alertErrorMsg('flashCode html5Code appCode apkCode windowsCode, should has one');
                return '';
            }
            if($scope.gamesItem.productCode == 'SLOTS'){
                if(typeof $scope.gamesItem.bigwinable !== 'boolean'){
                    $rootScope.alertErrorMsg('bigwinable is required');
                    return;
                }
                if(typeof $scope.gamesItem.hasJackpot !== 'boolean'){
                    $rootScope.alertErrorMsg('hasJackpot is required');
                    return;
                }
            }
            if($scope.gamesItem.html5Code){
                $scope.gamesItem.html5DemoSupported = true;
            }
            if($scope.gamesItem.flashCode){
                $scope.gamesItem.flashDemoSupported = true;
            }
            if($scope.gamesItem.name && $scope.gamesItem.name.length){
                var tempObj = {};
                var sameKey = false;
                $scope.gamesItem.name.map(function(nameItem) {
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
            var tempData = angular.copy($scope.gamesItem);
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
            console.log(tempData,'tempData9999')
            if (edit==2) {
                adminService.postReq($rootScope.URL.GAMESMANAGE.POST, {}, tempData).then(function (res) {
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
                adminService.patchReq($rootScope.URL.GAMESMANAGE.PATCH+'/'+gamesItem.id, {}, tempData).then(function (res) {
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
