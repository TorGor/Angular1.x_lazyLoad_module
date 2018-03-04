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
        .module('admin.userLevel', [
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

    var suffix = '.json';
    angular
        .module('admin')
        .constant('URL',{
            COUNTRIESMANAGE:'/rest/countries' + suffix,
            LOCALELANGUAGE:'/rest/locales' + suffix,
            USERLEVEL:'/rest/ranks' + suffix,
        });
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
(function (angular) {


    angular
        .module('admin')
        .factory('adminService', adminService);

    adminService.$inject = ['$http', 'EVN'];

    /* @ngInject */
    function adminService($http, EVN) {
        return {

            // 所有get请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            getReq: function (url, params, data) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: params||{},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data||{}
                })
            },

            // 所有添加请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            postReq: function (url, params, data) {
                return $http({
                    method: 'POST',
                    url: url,
                    params: params||{},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data||{}
                });
            },

            // 所有修改请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            patchReq: function (url, params, data) {
                return $http({
                    method: 'PATCH',
                    url: url,
                    params: params||{},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data||{}
                });
            },

            // 所有删除请求
            /**
             *
             * @param url 请求的url
             * @param params 请求的参数
             * @param data 请求的数据
             * @returns $promise
             */
            deleteReq: function (url, params, data) {
                return $http({
                    method: 'DELETE',
                    url: url,
                    params: params||{},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data ||{}
                });
            },
        };
    }

})(angular);


(function() {

    angular
        .module('admin.countriesManage')
        .controller('CountriesManageController', CountriesManageController);

    CountriesManageController.$inject = [
        '$scope',
        '$rootScope',
        'URL',
        'adminService'
    ];

    function CountriesManageController(
        $scope,
        $rootScope,
        URL,
        adminService
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
            adminService.getReq(URL.COUNTRIESMANAGE).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.countriesManage = angular.copy(res.data.data);
                        $scope.countriesManage.forEach(function (countriesManageItem, countriesManageIndex) {
                            countriesManageItem.id = countriesManageIndex + 1;
                        })
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
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
                adminService.postReq(URL.COUNTRIESMANAGE,tempData, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCountriesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && countriesManage.iso) {
                delete tempData.id;
                adminService.patchReq(URL.COUNTRIESMANAGE+'/'+countriesManage.iso, tempData, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initCountriesManageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
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
                    adminService.deleteReq(URL.COUNTRIESMANAGE+'/'+countriesManage.iso, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initCountriesManageData();
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

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelConditionsModalController', UserLevelConditionsModalController);

    UserLevelConditionsModalController.$inject = [
        '$scope',
        '$rootScope'
    ];

    function UserLevelConditionsModalController(
        $scope,
        $rootScope
    ) {

        // 原始的数据
        $scope.conditionsModal = [];

        // 过滤出来的数据
        $scope.showConditionsModal = [];
        $scope.conditionsModalReload = 1;
        $scope.conditionsModalAoData = {};
        $scope.conditionsModalSearch = '';

        // 初始化table数据
        $scope.initConditionsModalData = function () {
            $scope.conditionsModal = [];
        };


        // 保存
        /**
         *
         * @param conditionsModal 用户等级数据对象
         * @param item
         */

        $scope.saveConditionsModal = function (conditionsModal, item) {
            var tempData = angular.extend({}, conditionsModal, item);
            return '';
        };

        // 删除conditionsModal
        /**
         * @param conditionsModal 用户等级数据对象
         * @return null
         */
        $scope.deleteConditionsModal = function (conditionsModal) {
        };

        // 添加按钮
        $scope.addConditionsModal = function () {
            $scope.conditionsModalAoData = {};
            $scope.conditionsModalSearch = '';
            $scope.conditionsModal.unshift({
                'id': null,
                'conditionsModalName': '',
                'conditionsModalType': '',
                'conditionsModalStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.conditionsModal.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initConditionsModalData();
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelRebatesModalController', UserLevelRebatesModalController);

    UserLevelRebatesModalController.$inject = [
        '$scope',
        '$rootScope'
    ];

    function UserLevelRebatesModalController(
        $scope,
        $rootScope
    ) {

        // 原始的数据
        $scope.rebatesModal = [];

        // 过滤出来的数据
        $scope.showRebatesModal = [];
        $scope.rebatesModalReload = 1;
        $scope.rebatesModalAoData = {};
        $scope.rebatesModalSearch = '';

        // 初始化table数据
        $scope.initRebatesModalData = function () {
            $scope.rebatesModal = [];
        };


        // 保存
        /**
         *
         * @param rebatesModal 用户等级数据对象
         * @param item
         */

        $scope.saveRebatesModal = function (rebatesModal, item) {
            var tempData = angular.extend({}, rebatesModal, item);
            return '';
        };

        // 删除rebatesModal
        /**
         * @param rebatesModal 用户等级数据对象
         * @return null
         */
        $scope.deleteRebatesModal = function (rebatesModal) {
        };

        // 添加按钮
        $scope.addRebatesModal = function () {
            $scope.rebatesModalAoData = {};
            $scope.rebatesModalSearch = '';
            $scope.rebatesModal.unshift({
                'id': null,
                'rebatesModalName': '',
                'rebatesModalType': '',
                'rebatesModalStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.rebatesModal.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initRebatesModalData();
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelTreatmentsModalController', UserLevelTreatmentsModalController);

    UserLevelTreatmentsModalController.$inject = [
        '$scope',
        '$rootScope'
    ];

    function UserLevelTreatmentsModalController(
        $scope,
        $rootScope
    ) {

        // 原始的数据
        $scope.treatmentsModal = [];

        // 过滤出来的数据
        $scope.showTreatmentsModal = [];
        $scope.treatmentsModalReload = 1;
        $scope.treatmentsModalAoData = {};
        $scope.treatmentsModalSearch = '';

        // 初始化table数据
        $scope.initTreatmentsModalData = function () {
            $scope.treatmentsModal = [];
        };


        // 保存
        /**
         *
         * @param treatmentsModal 用户等级数据对象
         * @param item
         */

        $scope.saveTreatmentsModal = function (treatmentsModal, item) {
            var tempData = angular.extend({}, treatmentsModal, item);
            return '';
        };

        // 删除treatmentsModal
        /**
         * @param treatmentsModal 用户等级数据对象
         * @return null
         */
        $scope.deleteTreatmentsModal = function (treatmentsModal) {
        };

        // 添加按钮
        $scope.addTreatmentsModal = function () {
            $scope.treatmentsModalAoData = {};
            $scope.treatmentsModalSearch = '';
            $scope.treatmentsModal.unshift({
                'id': null,
                'treatmentsModalName': '',
                'treatmentsModalType': '',
                'treatmentsModalStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的用户等级
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.treatmentsModal.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        $scope.initTreatmentsModalData();
    }
})();

(function() {

    angular
        .module('admin.userLevel')
        .controller('UserLevelController', UserLevelController);

    UserLevelController.$inject = [
        '$scope',
        '$rootScope',
        'URL',
        'adminService'
    ];

    function UserLevelController(
        $scope,
        $rootScope,
        URL,
        adminService
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
            adminService.getReq(URL.USERLEVEL, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.userLevel = angular.copy(res.data.data);
                        $scope.userLevel.forEach(function (userLevelItem, userLevelIndex) {
                            userLevelItem.id = userLevelIndex +1
                        })
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
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
                adminService.postReq(URL.USERLEVEL, tempData, tempData).then(function (res) {
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
                adminService.patchReq(URL.USERLEVEL,tempData, tempData).then(function (res) {
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
                    adminService.deleteReq(URL.USERLEVEL, {id: userLevel.id}, {}).then(function (res) {
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
    }
})();

(function() {

    angular
        .module('admin.localeLanguage')
        .controller('LocaleLanguageController', LocaleLanguageController);

    LocaleLanguageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService',
        'URL',
        '$translate'
    ];

    function LocaleLanguageController(
        $scope,
        $rootScope,
        adminService,
        URL,
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
            adminService.getReq(URL.LOCALELANGUAGE, {}, {}).then(function (res) {
                console.log(res);
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $scope.localeLanguage = angular.copy(res.data.data);
                        $scope.localeLanguage.forEach(function (localeLanguageItem, localeLanguageIndex) {
                            localeLanguageItem.id = localeLanguageIndex +1;
                            localeLanguageItem.supported = localeLanguageItem.supported ? '1' : '0';
                        });
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
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
                adminService.postReq(URL.LOCALELANGUAGE, tempData, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initLocaleLanguageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
                        }
                    }
                });
            } else if (tempData.id && localeLanguage.code) {
                delete tempData.id;
                adminService.patchReq(URL.LOCALELANGUAGE+'/'+localeLanguage.code, tempData, tempData).then(function (res) {
                    console.log(res);
                    if (typeof res.data.success === 'boolean') {
                        if (res.data.success) {
                            $scope.initLocaleLanguageData();
                            $rootScope.toasterSuccess(res.data.msg);
                        } else {
                            $rootScope.alertErrorMsg(res.data.msg);
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
                    adminService.deleteReq(URL.LOCALELANGUAGE+'/'+localeLanguage.code, {}, {}).then(function (res) {
                        if (typeof res.data.success === 'boolean') {
                            if (res.data.success) {
                                $scope.initLocaleLanguageData();
                                $rootScope.toasterSuccess(res.data.msg);
                            } else {
                                $rootScope.alertErrorMsg(res.data.msg);
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
