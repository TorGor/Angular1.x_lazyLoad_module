(function() {

    angular
        .module('admin.localLanguage')
        .controller('AdminLocalLanguageController', AdminLocalLanguageController);

    AdminLocalLanguageController.$inject = [
        '$scope',
        '$rootScope',
        'adminService'
    ];

    function AdminLocalLanguageController(
        $scope,
        $rootScope,
        adminService
    ) {

        $scope.adminSelect012 = $rootScope.adminSelect012;

        // 原始的二级数据
        $scope.roles = [
            {
                "code": "bg-BG",
                "name": "български",
                "supported": false
            },
            {
                "code": "ca-ES",
                "name": "català",
                "supported": false
            },
            {
                "code": "cs-CZ",
                "name": "čeština",
                "supported": false
            },
            {
                "code": "da-DK",
                "name": "Dansk",
                "supported": false
            },
            {
                "code": "de-DE",
                "name": "Deutsch",
                "supported": false
            },
            {
                "code": "el-GR",
                "name": "Ελληνικά",
                "supported": false
            },
            {
                "code": "en-GB",
                "name": "English",
                "supported": true
            },
            {
                "code": "es-ES",
                "name": "español (España)",
                "supported": false
            },
            {
                "code": "es-PE",
                "name": "español (Perú)",
                "supported": false
            },
            {
                "code": "et-EE",
                "name": "Eesti",
                "supported": false
            },
            {
                "code": "fi-FI",
                "name": "suomi",
                "supported": false
            },
            {
                "code": "fr-FR",
                "name": "français",
                "supported": false
            },
            {
                "code": "hr-HR",
                "name": "hrvatski",
                "supported": false
            },
            {
                "code": "hu-HU",
                "name": "magyar",
                "supported": false
            },
            {
                "code": "in-ID",
                "name": "Bahasa",
                "supported": false
            },
            {
                "code": "is-IS",
                "name": "íslenska",
                "supported": false
            },
            {
                "code": "it-IT",
                "name": "italiano",
                "supported": false
            },
            {
                "code": "ja-JP",
                "name": "日本語",
                "supported": false
            },
            {
                "code": "ko-KR",
                "name": "한국어",
                "supported": false
            },
            {
                "code": "lt-LT",
                "name": "Lietuvių",
                "supported": false
            },
            {
                "code": "lv-LV",
                "name": "Latviešu",
                "supported": false
            },
            {
                "code": "nl-NL",
                "name": "Nederlands",
                "supported": false
            },
            {
                "code": "no-NO",
                "name": "norsk",
                "supported": false
            },
            {
                "code": "pl-PL",
                "name": "polski",
                "supported": false
            },
            {
                "code": "pt-BR",
                "name": "português (Brasil)",
                "supported": false
            },
            {
                "code": "pt-PT",
                "name": "português (Portugal)",
                "supported": false
            },
            {
                "code": "ro-RO",
                "name": "română",
                "supported": false
            },
            {
                "code": "ru-RU",
                "name": "русский",
                "supported": false
            },
            {
                "code": "sk-SK",
                "name": "Slovenčina (Slovenská republika)",
                "supported": false
            },
            {
                "code": "sl-SI",
                "name": "Slovenščina (Slovenija)",
                "supported": false
            },
            {
                "code": "sv-SE",
                "name": "svenska",
                "supported": false
            },
            {
                "code": "th-TH",
                "name": "ไทย",
                "supported": false
            },
            {
                "code": "tr-TR",
                "name": "Türkçe",
                "supported": false
            },
            {
                "code": "vi-VN",
                "name": "Tiếng Việt",
                "supported": false
            },
            {
                "code": "zh-CN",
                "name": "简体中文",
                "supported": true
            },
            {
                "code": "zh-TW",
                "name": "繁體中文",
                "supported": true
            }
        ];

        // 过滤出来的二级数据
        $scope.showRoles = [];
        $scope.rolesReload = 1;
        $scope.rolesAoData = {};

        // 初始化table数据
        $scope.initRolesData = function () {
            adminService.getFindPageRoleInfo({ 'pageSize': 50, 'curPage': 1 }, {}, function (data) {
                console.log(data);
                if (typeof data.success === 'boolean') {
                    if (data.success) {
                        $scope.roles = angular.copy(data.data.list);
                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            });
        };


        // 保存角色
        /**
         * @param role 角色对象
         * @param item 输入的内容
         * @return null
         */
        $scope.saveRole = function (role, item) {
            var tempData = angular.extend({}, role, item);
            if (!tempData.id) {
                delete tempData.id;
                adminService.postSaveRoleInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initRolesData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            } else if (tempData.id) {
                adminService.postUpdateRoleInfo({}, tempData, function (data) {
                    console.log(data);
                    if (typeof data.success === 'boolean') {
                        if (data.success) {
                            $scope.initRolesData();
                            $rootScope.toasterSuccess(data.msg);
                        } else {
                            $rootScope.alertErrorMsg(data.msg);
                        }
                    }
                });
            }

        };

        // 删除role
        /**
         * @param role 角色数据对象
         * @return null
         */
        $scope.deleteRole = function (role) {
            if (role.id) {
                $rootScope.alertConfirm(function () {
                    adminService.getDeleteRoleInfoById({ id: role.id }, {}, function (data) {
                        if (typeof data.success === 'boolean') {
                            if (data.success) {
                                $scope.initRolesData();
                                $rootScope.toasterSuccess(data.msg);
                            } else {
                                $rootScope.alertErrorMsg(data.msg);
                            }
                        }
                    });
                });
            }
        };

        // 添加按钮
        $scope.addRoles = function () {
            $scope.rolesAoData = {};
            $scope.roles.unshift({
                'id': null,
                'roleName': '',
                'roleType': '',
                'roleStatus': '1',
                'createTime': null,
                'optTime': null,
                'isShowTrEdit': true
            });
        };

        /**
         *
         * @param item 添加的对象
         * @param index 添加的index
         */

        $scope.cancelSave = function (item, index) {
            if (item.id == null) {
                $scope.roles.splice(index, 1);
            }
        };

        // 页面加载执行的函数

        // $scope.initRolesData();
    }
})();
