(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelController', UserLevelController);

    UserLevelController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'adminService'
    ];

    function UserLevelController(
        $scope,
        $rootScope,
        $uibModal,
        adminService
    ) {

        $scope.currencyOptions = [];

        // 原始的数据
        $scope.userLevel = [];

        // 过滤出来的数据
        $scope.showUserLevel = [];
        $scope.userLevelReload = 1;
        $scope.userLevelAoData = {};
        $scope.userLevelSearch = '';

        $scope.initCurrenciesManageData = function () {
            $scope.currencyOptions = [];
            adminService.getReq($rootScope.URL.CURRENCIESMANAGE, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        if(window.Array.isArray(res.data.data)){
                            res.data.data.map(function (objItem) {
                                var tempObj ={
                                    label:objItem.name||'',
                                    value:objItem.code||''
                                };
                                if(objItem.supported){
                                    $scope.currencyOptions.push(tempObj)
                                }
                            })
                        }
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        /**
         * 格式化userLevel数据
         * @param userLevelItem 数组中的每一项
         */
        $scope.formatUserLevelData = function (userLevelItem) {
            var conditions = [];
            var treatments = [];
            var rebates = [];
            if(userLevelItem['conditions']){
                window.Object.keys(userLevelItem['conditions']).map(function (key) {
                    window.Object.keys(userLevelItem['conditions'][key]).map(function (keyItem) {
                        conditions = conditions.concat(userLevelItem['conditions'][key][keyItem])
                    })
                })
            }
            if(userLevelItem['treatments']){
                window.Object.keys(userLevelItem['treatments']).map(function (key) {
                    treatments = treatments.concat(userLevelItem['treatments'][key])
                })
            }
            if(userLevelItem['rebates']){
                window.Object.keys(userLevelItem['rebates']).map(function (key) {
                    userLevelItem['rebates'][key].map(function (keyItem) {
                        var tempObj = {};
                        tempObj.product = keyItem['product'];
                        tempObj.max = keyItem['max'];
                        tempObj.days = keyItem['days'];
                        tempObj.currency = key;
                        if (window.Array.isArray(keyItem['brands'])) {
                            tempObj.brands = angular.copy(keyItem['brands']);
                        } else {
                            tempObj.brands = [];
                        }
                        tempObj.brands.forEach(function (brandsItem) {
                            if(brandsItem.currency){
                                delete brandsItem.currency
                            }
                        });
                        rebates.push(tempObj)
                    })
                })
            }
            return {
                conditions:conditions,
                treatments:treatments,
                rebates:rebates
            };
        };

        // 初始化table数据
        $scope.initUserLevelData = function () {
            $scope.userLevel = [];
            adminService.getReq($rootScope.URL.USERLEVEL, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.userLevel = angular.copy(res.data.data);
                        $scope.userLevel.forEach(function (userLevelItem, userLevelIndex) {
                            userLevelItem.id = userLevelIndex +1;
                            window.Object.assign(userLevelItem, $scope.formatUserLevelData(userLevelItem))
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                    }
                }
            });
        };

        $scope.showOptionsValue = function (str, arr) {
            if(str && arr.length){
                var tempBtnArray = arr.filter(function (optionsItem) {
                    return optionsItem.value == str;
                });
                if(tempBtnArray.length){
                    return tempBtnArray[0].label;
                }
            }
            return '';
        };

        /**
         * 根据传入的modal名称进行弹窗显示
         * @param modal 弹窗的名称
         * @param item 弹窗的数据
         */

        $scope.showEditModal = function (modal,item) {
            var templateName = '';
            var controllerName = '';
            if(modal == 'conditions'){
                templateName = 'conditionsModal';
                controllerName = 'UserLevelConditionsModalController';
            }else if(modal == 'treatments'){
                templateName = 'treatmentsModal';
                controllerName = 'UserLevelTreatmentsModalController';
            }else if(modal == 'rebates'){
                templateName = 'rebatesModal';
                controllerName = 'UserLevelRebatesModalController';
            }else{
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/admin/userLevel/'+templateName+'.html',
                controller: controllerName,
                size: 'lg',
                scope:$scope,
                resolve: {
                    item: item
                }
            });
            modalInstance.result.then(function (data) {
                if (data === 'neededUpdateUserLevel') {
                }
            }, function (cancel) {

            });
        };


        // 保存
        /**
         *
         * @param userLevel 用户等级数据对象
         * @param item
         */

        $scope.saveUserLevel = function (userLevel, item) {
            var tempData = angular.extend({}, userLevel, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postReq($rootScope.URL.USERLEVEL, tempData, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                adminService.patchReq($rootScope.URL.USERLEVEL,tempData, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除userLevel
        /**
         * @param userLevel 用户等级数据对象
         * @return null
         */
        $scope.deleteUserLevel = function (userLevel) {
            if (userLevel.id) {
                $rootScope.alertConfirm(function () {
                    adminService.deleteReq($rootScope.URL.USERLEVEL, {id: userLevel.id}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initUserLevelData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addUserLevel = function () {
            if(!$scope.userLevel.every(function (userLevelItem) {
                    return userLevelItem.id
                })){
                $rootScope.alertErrorMsg('current item needed save');
                return;
            }
            $scope.userLevelAoData = {};
            $scope.userLevelSearch = '';
            $scope.userLevel.unshift({
                'id': null,
                'code': '',
                'default': 1,
                'level': '1',
                'conditions': [],
                'treatments': [],
                'rebates': []
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.userLevel.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initUserLevelData();

        $scope.initCurrenciesManageData();
    }
})();
