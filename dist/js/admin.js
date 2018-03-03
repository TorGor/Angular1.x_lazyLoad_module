(function() {

    angular
        .module('admin', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
			'admin.localeLanguage',
			//new module name will be append here

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
        .module('admin.localeLanguage')
        .controller('LocaleLanguageController', LocaleLanguageController);

    LocaleLanguageController.$inject = [
        '$scope',
        '$rootScope',
        'adminLocaleLanguageService'
    ];

    function LocaleLanguageController(
        $scope,
        $rootScope,
        adminLocaleLanguageService
    ) {

        // 原始的数据
        $scope.localeLanguage = [];

        // 过滤出来的数据
        $scope.showLocaleLanguage = [];
        $scope.localeLanguageReload = 1;
        $scope.localeLanguageAoData = {};
        $scope.localeLanguageSearch = '';

        // 初始化table数据
        $scope.initLocaleLanguageData = function () {
            adminLocaleLanguageService.getLocaleLanguageList({}, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.localeLanguage = angular.copy(data.data);
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
            if (!tempData.code) {
                delete tempData.id;
                adminLocaleLanguageService.postSaveLocaleLanguageInfo({}, tempData, function (data) {
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
            } else if (tempData.code) {
                adminLocaleLanguageService.patchUpdateLocaleLanguageInfo({}, tempData, function (data) {
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
            $scope.localeLanguage.push({
                "code": "",
                "name": "",
                "supported": true
            })
        };

        /**
         *
         * @param item 添加的本地语言
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.code === '') {
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

