(function() {

    angular
        .module('admin.promotionsManage')
        .controller('promotionsModalController', promotionsModalController);

    promotionsModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'adminService',
        'promotionsItem',
        'edit',
        'hasPower',
        '$translate'
    ];

    function promotionsModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        adminService,
        promotionsItem,
        edit,
        hasPower,
        $translate
    ) {

        $scope.hasPower = hasPower;

        $scope.edit = edit;

        if(edit!==2){
            $scope.promotionsItem = angular.copy(promotionsItem)
        }else{
            $scope.promotionsItem = {
                banner: '',
                currency: $scope.currencyOptions[0] && $scope.currencyOptions[0].value || '',
                status: $scope.statusOptions[0] && $scope.statusOptions[0].value || '',
                startTime: '',
                endTime: '',
                categories: [],
                title: [],
                content: [],
            };
        }


        if($scope.promotionsItem.period){
            $scope.promotionsItem.startTime = $scope.promotionsItem.period.from || '';
            $scope.promotionsItem.endTime = $scope.promotionsItem.period.to || '';
            delete $scope.promotionsItem.period
        }

        $scope.timeStart = $scope.promotionsItem.startTime || '';
        $scope.timeEnd = $scope.promotionsItem.endTime || '';

        /**
         * 点击复选框
         * @param value value值
         * @param $event 点击事件
         */
        $scope.selectCategories = function(value, $event) {
            if($event.target.checked){
                if($scope.promotionsItem.categories.indexOf(value) === -1){
                    $scope.promotionsItem.categories.push(value)
                }
            }else{
                $scope.promotionsItem.categories.splice($scope.promotionsItem.categories.indexOf(value), 1)
            }
        };

        // 过滤出来的数据
        $scope.showTitleModal = [];
        $scope.titleModalReload = 1;
        $scope.titleModalAoData = {};
        $scope.titleModalSearch = '';

        // 初始化table数据
        $scope.initTitleModalData = function () {
            $scope.promotionsItem['title'].forEach(function (titleItem, titleIndex) {
                titleItem.id = titleIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param titleModal 渠道名称数据对象
         * @param data
         */

        $scope.saveTitleModal = function (titleModal, data) {
            $scope.promotionsItem['title'].forEach(function (titleModalItem) {
                if(titleModalItem.id == titleModal.id){
                    window.Object.assign(titleModalItem, data);
                    if($scope.validIsNew(titleModalItem.id)){
                        titleModalItem.id = window.parseInt(titleModalItem.id, 10)
                        $scope.titleModalReload ++
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param titleModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteTitleModal = function (titleModal, index) {
            $scope.promotionsItem['title'].splice(index, 1)
        };

        // 添加按钮
        $scope.addTitleModal = function () {
            $scope.titleModalAoData = {};
            $scope.titleModalSearch = '';
            $scope.promotionsItem['title'].unshift({
                'id': ($scope.promotionsItem['title'].length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param titleItem 条件项目
         * @param index 添加的index
         */

        $scope.cancelSaveTitleModal = function (titleItem, index) {
            if ($scope.validIsNew(titleItem.id)) {
                $scope.promotionsItem['title'].splice(index, 1);
            }
        };


        // 过滤出来的数据
        $scope.showContentModal = [];
        $scope.contentModalReload = 1;
        $scope.contentModalAoData = {};
        $scope.contentModalSearch = '';


        // 初始化table数据
        $scope.initContentModalData = function () {
            $scope.promotionsItem['content'].forEach(function (contentItem, contentIndex) {
                contentItem.id = contentIndex + 1;
            })
        };


        // 保存
        /**
         *
         * @param contentModal 处理对象数据对象
         * @param data
         */

        $scope.saveContentModal = function (contentModal, data) {
            $scope.promotionsItem['content'].forEach(function (contentModalItem) {
                if(contentModalItem.id == contentModal.id){
                    window.Object.assign(contentModalItem, data);
                    if($scope.validIsNew(contentModalItem.id)){
                        contentModalItem.id = window.parseInt(contentModalItem.id, 10)
                        $scope.contentModalReload ++
                    }
                }
            });
        };

        // 删除处理对象Modal
        /**
         * @param contentModal 处理对象
         * @param index 位置
         * @return null
         */
        $scope.deleteContentModal = function (contentModal, index) {
            $scope.promotionsItem['content'].splice(index, 1)
        };

        // 添加按钮
        $scope.addContentModal = function () {
            $scope.contentModalAoData = {};
            $scope.contentModalSearch = '';
            $scope.promotionsItem['content'].unshift({
                'id': ($scope.promotionsItem['content'].length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param contentItem 处理项目
         * @param index 添加的index
         */

        $scope.cancelSaveContentModal = function (contentItem, index) {
            if ($scope.validIsNew(contentItem.id)) {
                $scope.promotionsItem['content'].splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            console.log($scope.promotionsItem,6666)
            return;
            var tempData = angular.copy($scope.promotionsItem);
            tempData['title'] = tempData['title'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['title'])){
                tempData['title'].forEach(function(titleItem) {
                    if(titleItem.id){
                        delete titleItem.id;
                    }
                })
            }
            tempData['content'] = tempData['content'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['content'])){
                tempData['content'].forEach(function(contentItem) {
                    if(contentItem.id){
                        delete contentItem.id;
                    }
                })
            }
            if (!edit) {
                adminService.postReq($rootScope.URL.COUPONSMANAGE.POST, {}, tempData).then(function (res) {
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
            } else if (edit) {
                adminService.patchReq($rootScope.URL.COUPONSMANAGE.PATCH+'/'+promotionsItem.code, {}, tempData).then(function (res) {
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


        $scope.confirmModal = function () {
            if($scope.promotionsItem.title.length == 0){
                $rootScope.alertErrorMsg('title is required');
                return '';
            }
            if($scope.promotionsItem.content.length == 0){
                $rootScope.alertErrorMsg('content is required');
                return '';
            }
            if($scope.promotionsItem.title && $scope.promotionsItem.title.length){
                var tempObj1 = {};
                var sameKey1 = false;
                $scope.promotionsItem.title.map(function(nameItem) {
                    if(tempObj1[nameItem.locale]){
                        sameKey1 = true
                    }
                    tempObj1[nameItem.locale] = nameItem.value
                });
                if(sameKey1){
                    $rootScope.alertErrorMsg('you set same local in title table, just remove one');
                    return '';
                }
            }
            if($scope.promotionsItem.content && $scope.promotionsItem.content.length){
                var tempObj2 = {};
                var sameKey2 = false;
                $scope.promotionsItem.content.map(function(nameItem) {
                    if(tempObj2[nameItem.locale]){
                        sameKey2 = true
                    }
                    tempObj2[nameItem.locale] = nameItem.value
                });
                if(sameKey2){
                    $rootScope.alertErrorMsg('you set same local in content table, just remove one');
                    return '';
                }
            }
            var tempData = angular.copy($scope.promotionsItem);

            //处理title
            tempData['title'] = tempData['title'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['title'])){
                tempData['title'].forEach(function(titleItem) {
                    if(titleItem.id){
                        delete titleItem.id;
                    }
                })
            }
            if(tempData.title && tempData.title.length){
                var tempNameObj1 = {};
                tempData.title.map(function(nameItem) {
                    tempNameObj1[nameItem.locale] = nameItem.value
                });
                tempData.title = angular.copy(tempNameObj1)
            }

            //处理content
            tempData['content'] = tempData['content'].filter(function (item) {
                return !$scope.validIsNew(item.id);
            });
            if(window.Array.isArray(tempData['content'])){
                tempData['content'].forEach(function(contentItem) {
                    if(contentItem.id){
                        delete contentItem.id;
                    }
                })
            }
            if(tempData.content && tempData.content.length){
                var tempNameObj2 = {};
                tempData.content.map(function(nameItem) {
                    tempNameObj2[nameItem.locale] = nameItem.value
                });
                tempData.content = angular.copy(tempNameObj2)
            }
            if (edit==2) {
                adminService.postReq($rootScope.URL.PROMOTIONSMANAGE.POST, {}, tempData).then(function (res) {
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
                adminService.patchReq($rootScope.URL.PROMOTIONSMANAGE.PATCH+'/'+promotionsItem.id, {}, tempData).then(function (res) {
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

        $scope.initTitleModalData();

        $scope.initContentModalData();

        $scope.$watch('timeStart+timeEnd', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.timeStart) {
                    $scope.promotionsItem.startTime = $scope.timeStart.format && $scope.timeStart.format('YYYY-MM-DD') + ' 00:00:00';
                } else {
                    $scope.promotionsItem.startTime = '';
                }
                if ($scope.timeEnd) {
                    $scope.promotionsItem.endTime = $scope.timeEnd.format && $scope.timeEnd.format('YYYY-MM-DD') + ' 23:59:59';
                } else {
                    $scope.promotionsItem.endTime = '';
                }
            }
        });

    }
})();
