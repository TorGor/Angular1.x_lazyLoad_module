(function() {

    angular
        .module('admin', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
			'admin.localeLanguage',
			'admin.countriesManage',
			'admin.userLevel',
			//new module name will be append here

        ]);
})();
(function() {

    angular
        .module('admin.countriesManage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.localeLanguage', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin.userLevel', [
            'app.core',
        ]);
})();
(function() {

    angular
        .module('admin')
        .run(appRun);

    appRun.$inject = [
        '$rootScope',
        '$translate'
    ];

    function appRun(
        $rootScope,
        $translate
    ) {

        $rootScope.adminSelect012 = {
            // 0-禁用；1-启用；
            options: [
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                }
            ],
            // 0-禁用；1-启用；2-删除；''-全部；
            optionsSearch: [
                {
                    label: $translate.instant('options.all'),
                    value: ''
                },
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                },
                {
                    label: $translate.instant('options.delete'),
                    value: '2'
                }
            ]
        };

    }

})();
(function() {

    angular
        .module('admin.countriesManage')
        .controller('CountriesManageController', CountriesManageController);

    CountriesManageController.$inject = [
        '$scope',
        '$rootScope',
        'adminCountriesManageService'
    ];

    function CountriesManageController(
        $scope,
        $rootScope,
        adminCountriesManageService
    ) {

        // 原始的数据
        $scope.countriesManage = [];

        // 过滤出来的数据
        $scope.showCountriesManage = [];
        $scope.countriesManageReload = 1;
        $scope.countriesManageAoData = {};
        $scope.countriesManageSearch = '';

        // 初始化table数据
        $scope.initCountriesManageData = function () {
            $scope.countriesManage = [];
            adminCountriesManageService.getCountriesManageList({}, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.countriesManage = angular.copy(data.data);
                        $scope.countriesManage.forEach(function (countriesManageItem, countriesManageIndex) {
                            countriesManageItem.id = countriesManageIndex + 1;
                        })
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param countriesManage 国家管理数据对象
         * @param item
         */

        $scope.saveCountriesManage = function (countriesManage, item) {
            var tempData = angular.extend({}, countriesManage, item);
            if (!tempData.id) {
                delete tempData.id;
                adminCountriesManageService.saveCountriesManageInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initCountriesManageData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                adminCountriesManageService.updateCountriesManageInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initCountriesManageData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }
            return '';
        };

        // 删除countriesManage
        /**
         * @param countriesManage 国家管理数据对象
         * @return null
         */
        $scope.deleteCountriesManage = function (countriesManage) {
            if (countriesManage.iso) {
                $rootScope.alertConfirm(function () {
                    adminCountriesManageService.updateCountriesManageInfo({ iso: countriesManage.iso }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initCountriesManageData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                                return '';
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addCountriesManage = function () {
            $scope.countriesManageAoData = {};
            $scope.countriesManageSearch = '';
            $scope.countriesManage.unshift({
                "id": null,
                "iso": "",
                "iso3": "",
                "numCode": '',
                "name": "",
                "phoneCode": '',
                "currency": '',
                "niceName": "",
            });
        };

        /**
         *
         * @param item 添加的国家管理
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.countriesManage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initCountriesManageData();
    }
})();

(function (angular) {
    

    angular
        .module('admin.countriesManage')
        .factory('adminCountriesManageService', adminCountriesManageService);

    adminCountriesManageService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminCountriesManageService($resource, EVN) {
        return $resource(EVN.server + '/rest/:action',
            {},
            {

                // 查询国家管理
                getCountriesManageList: {
                    method: 'GET',
                    params: {
                        action: 'getCountries' + EVN.suffix
                    }
                },

                // 添加国家管理
                saveCountriesManageInfo: {
                    method: 'POST',
                    params: {
                        action: 'postCountries' + EVN.suffix
                    }
                },

                // 修改国家管理
                updateCountriesManageInfo: {
                    method: 'PATCH',
                    params: {
                        action: 'patchCountries' + EVN.suffix
                    }
                },

                // 删除国家管理
                deleteCountriesManageInfoById: {
                    method: 'DELETE',
                    params: {
                        action: 'deleteCountries' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);


(function() {

    angular
        .module('admin.localeLanguage')
        .controller('LocaleLanguageController', LocaleLanguageController);

    LocaleLanguageController.$inject = [
        '$scope',
        '$rootScope',
        'adminLocaleLanguageService',
        '$translate'
    ];

    function LocaleLanguageController(
        $scope,
        $rootScope,
        adminLocaleLanguageService,
        $translate
    ) {

        // 原始的数据
        $scope.localeLanguage = [];

        $scope.options = [
            {
                value:'0',
                label:$translate.instant('table.localeLanguage.th3ShowFalse')
            },
            {
                value:'1',
                label:$translate.instant('table.localeLanguage.th3ShowTrue')
            }
        ];

        // 过滤出来的数据
        $scope.showLocaleLanguage = [];
        $scope.localeLanguageReload = 1;
        $scope.localeLanguageAoData = {};
        $scope.localeLanguageSearch = '';

        // 初始化table数据
        $scope.initLocaleLanguageData = function () {
            $scope.localeLanguage = [];
            adminLocaleLanguageService.getLocaleLanguageList({}, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.localeLanguage = angular.copy(data.data);
                        $scope.localeLanguage.forEach(function (localeLanguageItem, localeLanguageIndex) {
                            localeLanguageItem.id = localeLanguageIndex +1;
                            localeLanguageItem.supported = localeLanguageItem.supported ? '1' : '0';
                        });
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };


        // 保存
        /**
         *
         * @param localeLanguage 本地语言数据对象
         * @param item
         */

        $scope.saveLocaleLanguage = function (localeLanguage, item) {
            var tempData = angular.extend({}, localeLanguage, item);
            if (!tempData.id) {
                delete tempData.id;
                adminLocaleLanguageService.postSaveLocaleLanguageInfo(tempData, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initLocaleLanguageData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                delete tempData.id;
                adminLocaleLanguageService.patchUpdateLocaleLanguageInfo(tempData, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initLocaleLanguageData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }

            return '';
        };

        // 删除localeLanguage
        /**
         * @param localeLanguage 本地语言数据对象
         * @return null
         */
        $scope.deleteLocaleLanguage = function (localeLanguage) {
            if (localeLanguage.code) {
                $rootScope.alertConfirm(function () {
                    adminLocaleLanguageService.deleteLocaleLanguage({ code: localeLanguage.code }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initLocaleLanguageData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 添加的本地语言
        $scope.addLocaleLanguage = function () {
            $scope.localeLanguageAoData = {};
            $scope.localeLanguageSearch = '';
            $scope.localeLanguage.unshift({
                "id": null,
                "code": "",
                "name": "",
                "supported": '1'
            })
        };

        /**
         *
         * @param item 添加的本地语言
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.localeLanguage.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initLocaleLanguageData();
    }
})();

(function (angular) {
    

    angular
        .module('admin.localeLanguage')
        .factory('adminLocaleLanguageService', adminLocaleLanguageService);

    adminLocaleLanguageService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminLocaleLanguageService($resource, EVN) {
        return $resource(EVN.server + '/rest/:action',
            {},
            {

                // 查询本地语言
                getLocaleLanguageList: {
                    method: 'GET',
                    params: {
                        action: 'getLocales' + EVN.suffix
                    }
                },

                // 添加本地语言
                postSaveLocaleLanguageInfo: {
                    method: 'POST',
                    params: {
                        action: 'postLocales' + EVN.suffix
                    }
                },

                // 修改本地语言
                patchUpdateLocaleLanguageInfo: {
                    method: 'PATCH',
                    params: {
                        action: 'patchLocales' + EVN.suffix
                    }
                },

                // 删除本地语言
                deleteLocaleLanguage: {
                    method: 'delete',
                    params: {
                        action: 'deleteLocales' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);


(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelController', UserLevelController);

    UserLevelController.$inject = [
        '$scope',
        '$rootScope',
        'adminUserLevelService'
    ];

    function UserLevelController(
        $scope,
        $rootScope,
        adminUserLevelService
    ) {

        // 原始的数据
        $scope.userLevel = [];

        // 过滤出来的数据
        $scope.showUserLevel = [];
        $scope.userLevelReload = 1;
        $scope.userLevelAoData = {};
        $scope.userLevelSearch = '';

        // 初始化table数据
        $scope.initUserLevelData = function () {
            $scope.userLevel = [];
            adminUserLevelService.getUserLevelList({}, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.userLevel = angular.copy(data.data);
                        $scope.userLevel.forEach(function (userLevelItem, userLevelIndex) {
                            userLevelItem.id = userLevelIndex +1
                        })
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
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
                adminUserLevelService.saveUserLevelInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                adminUserLevelService.updateUserLevelInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initUserLevelData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
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
                    adminUserLevelService.deleteUserLevelInfo({ id: userLevel.id }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initUserLevelData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
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
    }
})();

(function (angular) {
    

    angular
        .module('admin.userLevel')
        .factory('adminUserLevelService', adminUserLevelService);

    adminUserLevelService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function adminUserLevelService($resource, EVN) {
        return $resource(EVN.server + '/rest/:action',
            {},
            {

                // 查询用户等级
                getUserLevelList: {
                    method: 'GET',
                    params: {
                        action: 'userLevel' + EVN.suffix
                    }
                },

                // 添加用户等级
                saveUserLevelInfo: {
                    method: 'POST',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 修改用户等级
                updateUserLevelInfo: {
                    method: 'PUT',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

                // 删除用户等级
                deleteUserLevelInfo: {
                    method: 'GET',
                    params: {
                        action: '' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);

