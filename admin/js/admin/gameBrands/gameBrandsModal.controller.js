(function() {

    angular
        .module('admin.gameBrands')
        .controller('GameBrandsModalController', GameBrandsModalController);

    GameBrandsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'edit',
        'hasPower',
        'modalItem'
    ];

    function GameBrandsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        edit,
        hasPower,
        modalItem
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        $scope.modalItem = angular.copy(modalItem);

        //初始化数据

        $scope.initGameBrandModalData = function () {
            if(edit == 2){
                $scope.modalItem = {
                    'code': '',
                    'wallet': $scope.walletOptions[0]&&$scope.walletOptions[0].value||'',
                    'status': 'OPEN',
                    'currencies': [],
                    'langs': [],
                    'products': []
                }
            }else{

            }
            if($scope.modalItem['name']&&$scope.modalItem['name'].length){
                $scope.methodsNameModal = $scope.modalItem['name'];
                $scope.methodsNameModal.forEach(function (methodsNameItem, methodsNameIndex) {
                    methodsNameItem.id = methodsNameIndex + 1;
                })
            }else{
                $scope.methodsNameModal = [];
            }
            if($scope.modalItem['langs']&&$scope.modalItem['langs'].length){
                $scope.brandsLangsModal = $scope.modalItem['langs'];
                $scope.brandsLangsModal.forEach(function (modalItem, brandsLangsIndex) {
                    modalItem.id = brandsLangsIndex + 1;
                })
            }else{
                $scope.brandsLangsModal = [];
            }
            if($scope.modalItem['products']&&$scope.modalItem['products'].length){
                $scope.brandsProductsModal = $scope.modalItem['products'];
                $scope.brandsProductsModal.forEach(function (modalItem, brandsProductsIndex) {
                    modalItem.id = brandsProductsIndex + 1;
                })
            }else{
                $scope.brandsProductsModal = [];
            }
            if($scope.modalItem['currencies']){
                $scope.brandsCurrenciesModal = $scope.modalItem['currencies'];
            }else {
                $scope.brandsCurrenciesModal = [];
            }
        };


        //名称列表开始



        // 原始的数据
        $scope.methodsNameModal = [];

        // 过滤出来的数据
        $scope.showMethodsNameModal = [];
        $scope.methodsNameModalReload = 1;
        $scope.methodsNameModalAoData = {};
        $scope.methodsNameModalSearch = '';


        // 保存
        /**
         *
         * @param methodsNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveMethodsNameModal = function (methodsNameModal, data) {
            $scope.methodsNameModal.forEach(function (methodsNameModalItem) {
                if(methodsNameModalItem.id == methodsNameModal.id){
                    window.Object.assign(methodsNameModalItem, data);
                    if($scope.validIsNew(methodsNameModalItem.id)){
                        methodsNameModalItem.id = window.parseInt(methodsNameModalItem.id, 10)
                        $scope.methodsNameModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param methodsNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteMethodsNameModal = function (methodsNameModal, index) {
            $scope.methodsNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addMethodsNameModal = function () {
            $scope.methodsNameModalAoData = {};
            $scope.methodsNameModalSearch = '';
            $scope.methodsNameModal.unshift({
                'id': ($scope.methodsNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveNameModal = function (item, index) {
            if ($scope.validIsNew(item.id)) {
                $scope.methodsNameModal.splice(index, 1);
            }
        };

        //名称列表结束


        //语言列表开始


        // 原始的数据
        $scope.brandsLangsModal = [];

        // 过滤出来的数据
        $scope.showBrandsLangsModal = [];
        $scope.brandsLangsModalReload = 1;
        $scope.brandsLangsModalAoData = {};
        $scope.brandsLangsModalSearch = '';

        // 保存
        /**
         *
         * @param brandsLangsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveBrandsLangsModal = function (brandsLangsModal, data) {
            $scope.brandsLangsModal.forEach(function (brandsLangsModalItem) {
                if(brandsLangsModalItem.id == brandsLangsModal.id){
                    window.Object.assign(brandsLangsModalItem, data);
                    if($scope.validIsNew(brandsLangsModalItem.id)){
                        brandsLangsModalItem.id = window.parseInt(brandsLangsModalItem.id, 10)
                        $scope.brandsLangsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param brandsLangsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteBrandsLangsModal = function (brandsLangsModal, index) {
            $scope.brandsLangsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addBrandsLangsModal = function () {
            $scope.brandsLangsModalAoData = {};
            $scope.brandsLangsModalSearch = '';
            $scope.brandsLangsModal.unshift({
                'id': ($scope.brandsLangsModal.length+1) + 'null',
                "our_locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "brand_locale": ''
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveLangsModal = function (modalItem, index) {
            if ($scope.validIsNew(modalItem.id)) {
                $scope.brandsLangsModal.splice(index, 1);
            }
        };

        //语言列表结束

        //产品列表开始
        // 原始的数据
        $scope.brandsProductsModal = [];

        // 过滤出来的数据
        $scope.showBrandsProductsModal = [];
        $scope.brandsProductsModalReload = 1;
        $scope.brandsProductsModalAoData = {};
        $scope.brandsProductsModalSearch = '';

        // 保存
        /**
         *
         * @param brandsProductsModal 渠道名称数据对象
         * @param data
         */

        $scope.saveBrandsProductsModal = function (brandsProductsModal, data) {
            $scope.brandsProductsModal.forEach(function (brandsProductsModalItem) {
                if(brandsProductsModalItem.id == brandsProductsModal.id){
                    window.Object.assign(brandsProductsModalItem, data);
                    if($scope.validIsNew(brandsProductsModalItem.id)){
                        brandsProductsModalItem.id = window.parseInt(brandsProductsModalItem.id, 10)
                        $scope.brandsProductsModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param brandsProductsModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteBrandsProductsModal = function (brandsProductsModal, index) {
            $scope.brandsProductsModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addBrandsProductsModal = function () {
            $scope.brandsProductsModalAoData = {};
            $scope.brandsProductsModalSearch = '';
            $scope.brandsProductsModal.unshift({
                'id': ($scope.brandsProductsModal.length+1) + 'null',
                "code": $scope.productOptions[0] ? $scope.productOptions[0].value : '',
                "osx_url": '',
                "windows_url": '',
                "ios_url": '',
                "android_url": '',
            });
        };

        /**
         *
         * @param modalItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveProductsModal = function (modalItem, index) {
            if ($scope.validIsNew(modalItem.id)) {
                $scope.brandsProductsModal.splice(index, 1);
            }
        };

        //产品列表结束



        //选择货币开始

        //$scope.selectObj = {};

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectCurrency = function(value, $event) {
            if($event.target.checked){
               if($scope.brandsCurrenciesModal.indexOf(value) === -1){
                   $scope.brandsCurrenciesModal.push(value)
               }
            }else{
                $scope.brandsCurrenciesModal.splice($scope.brandsCurrenciesModal.indexOf(value), 1)
            }
        };

        //选择货币结束

        $scope.confirmModal = function () {

            //校验name

            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local in name list,just remove one');
                    return '';
                }
            }

            //校验langs

            if($scope.brandsLangsModal && $scope.brandsLangsModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.brandsLangsModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local in brand list,just remove one');
                    return '';
                }
            }

            //校验product

            if($scope.brandsProductsModal && $scope.brandsProductsModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.brandsProductsModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local in product list,just remove one');
                    return '';
                }
            }

            alert(444)

            //提取数据

            var tempData = angular.copy($scope.modalItem);

            //提取name数据

            if($scope.methodsNameModal && $scope.methodsNameModal.length){
                var tempObjName = {};
                var sameKeyName = false;
                $scope.methodsNameModal.map(function(nameItem) {
                    if(tempObjName[nameItem.locale]&&!$scope.validIsNew(nameItem.id)){
                        sameKeyName = true
                    }
                    tempObjName[nameItem.locale] = nameItem.value
                });
                if(sameKeyName){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
                tempData.name = angular.copy(tempObjName)
            }else{
                tempData.name = {}
            }

            //提取langs数据

            var tempBrandsLangs = angular.copy($scope.brandsLangsModal);

            tempBrandsLangs = tempBrandsLangs.filter(function (modalItem) {
                return !$scope.validIsNew(modalItem.id);
            });
            tempBrandsLangs.forEach(function (modalItem, brandsLangsIndex) {
                if(modalItem.id){
                    delete modalItem.id;
                }
            });
            tempData.langs = tempBrandsLangs;

            //提取product数据
            var tempBrandsProducts = angular.copy($scope.brandsProductsModal);
            tempBrandsProducts = tempBrandsProducts.filter(function (modalItem) {
                return !$scope.validIsNew(modalItem.id);
            });
            tempBrandsProducts.forEach(function (modalItem, brandsProductsIndex) {
                if(modalItem.id){
                    delete modalItem.id;
                }
            });
            tempData.products = tempBrandsProducts;

            //提取Currency数据

            tempData.currencies = angular.copy($scope.brandsCurrenciesModal);

            if(edit==2){
                adminService.postReq($rootScope.URL.GAMEBRANDS.POST, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }else if(edit==3){
                adminService.patchReq($rootScope.URL.GAMEBRANDS.PATCH+'/'+gameBrands.code, {}, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $uibModalInstance.close('OK');
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

        //页面加载执行

        $scope.initGameBrandModalData();
    }
})();
