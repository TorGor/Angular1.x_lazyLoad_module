/* !
 *
 * Angle - Bootstrap Admin App + AngularJS
 *
 * Version: 3.8.3
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

// APP START
// -----------------------------------

(function() {
    

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'tmh.dynamicLocale',
            'ui.utils',
            'oitozero.ngSweetAlert',
            'toaster'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = [
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        '$httpProvider',
        '$animateProvider'
    ];
    function coreConfig(
        $controllerProvider,
        $compileProvider,
        $filterProvider,
        $provide,
        $httpProvider,
        $animateProvider
    ){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

      // Improve performance disabling debugging features
      // $compileProvider.debugInfoEnabled(false);

      $httpProvider.interceptors.push('customeInterceptor');

    }

})();
/** =========================================================
 * Module: constants.js
 * Define constants to inject across the application
 ========================================================= */

(function() {

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
            'desktopLG': 1200,
            'desktop': 992,
            'tablet': 768,
            'mobile': 480
        })
        .constant('EVN', {
            debug: true,
            // suffix: '.json',
            suffix: '',
            server: '',
             // server: 'http://193.112.155.213:80',
            // server: 'http://madmin.ngrok.xiaomiqiu.cn',
            //server: 'http://holyplace.ngrok.xiaomiqiu.cn',
            URLOBJ:{
                locales: 'LOCALELANGUAGE',
                countries: 'COUNTRIESMANAGE',
                transactions: 'TRANSACTIONSDETAIL',
                currencies: 'CURRENCIESMANAGE',
                blacklists: 'BLACKLISTS',
                ranks: 'USERLEVEL',
                orders: 'ORDERSMANAGE',
                methods: 'PAYMENTMETHODS',
                applies: 'APPLIESUSE',
                brands: 'GAMEBRANDS',
                categories: 'GAMECATEGORIES',
                coupons: 'COUPONSMANAGE',
                games: 'GAMESMANAGE',
                products: 'GAMESPRODUCTS',
                psps: 'PSPSMANAGE',
                withdraws: 'WITHDRAWSMANAGE',
                promotions: 'PROMOTIONSMANAGE',
                rebates: 'REBATESLIST',
                reliefs: 'RELIEFSLIST',
                transfers: 'TRANSFERSLIST',
                wallets: 'WALLETSMANAGE',
                bigwins: 'BIGWINSMANAGE',
                records: 'GAMERECORDS',
                users: 'USERSMANAGE',
                domains: 'DOMAINSMANAGE',
                affiliates: 'AFFILIATESMANAGE',
                plans: 'AFFILIATESPLANS',
                cards: 'BANKCARDS',
                mediaCategories: 'MEDIACATEGORIES',
                media: 'MEDIAFILES',
                manageMenu: 'MANAGEMENU',
                manageButton: 'MANAGEBUTTON',
                manageRole: 'MANAGEROLE',
                manageRoleMenu: 'MANAGEROLEMENU',
                manageAdminUser: 'MANAGEADMINUSER',
                manageAdminRole: 'MANAGEADMINROLE',
                manageOptLog: 'MANAGEOPTLOG',
            }
        });
})();
(function() {


    angular
        .module('app.core')
        .controller('MainController', MainController);

    MainController.$inject = [
        '$scope',
        '$rootScope',
        '$translate',
        'SweetAlert',
        'toaster'
    ];

    function MainController(
        $scope,
        $rootScope,
        $translate,
        SweetAlert,
        toaster
    ) {

        var locale = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY')||((window.navigator.language || window.navigator.language).indexOf('zh-CN') !== -1 ? 'zh-CN' : 'en-GB');

        /**
         *
         * @param value 0-禁用；1-启用；2-删除；
         * @return {*}
         */

        // 0-禁用；1-启用；2-删除；
        $scope.filter012OptionsValue = function (value) {
            if (value == 0) {
                return '<div class="label label-warning">' + $translate.instant('options.forbid') + '</div>';
            } else if (value == 1) {
                return '<div class="label label-success">' + $translate.instant('options.enable') + '</div>';
            } else if (value == 2) {
                return '<div class="label label-danger">' + $translate.instant('options.delete') + '</div>';
            } else {
                return '';
            }
        };

        var EDITOBJ = {
            '1':'查看',
            '2':'添加',
            '3':'修改',
        };

        $scope.showEditStatus = function(edit) {

            if(!edit){
                return '';
            }
            return EDITOBJ[edit]||'';
        };

        $scope.checkIsDelete = function(item) {
            if(item.timestamps&&item.timestamps.deletedAt){
                return true;
            }
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
            if(typeof str === 'string'){
                return str;
            }
            return str || '';
        };


        $scope.searchPlaceholder = function(param) {
            if (window.Array.isArray(param)) {
                var tempArr = param.map(function(item) {
                    return $translate.instant(item);
                });
                return tempArr.join('/');
            }
            if (typeof param === 'string') {
                return $translate.instant(param);
            }
            return ' search all';
        };

        var contactStr = locale.indexOf('zh')===-1?' ':'';

        $scope.contactTranslateArr = function(param) {
            if (window.Array.isArray(param)) {
                var tempArr = param.map(function(item) {
                    return $translate.instant(item);
                });
                return tempArr.join(contactStr);
            }
            if (typeof param === 'string') {
                return $translate.instant(param);
            }
            return '';
        };

        // 判断是否是一个新添加的
        $scope.validIsNew = function (str) {
            if (str && str.toString().indexOf('null') !== -1) {
                return true;
            }
            return false;
        };

        /**
         *  检测是否有权限
         * @param module 模块名称
         * @param arr arr或str GET,POST,DELETE
         * @returns {boolean}
         */
        $scope.validPower = function (module, arr) {
            var result = false;
            if(typeof arr == 'string'){
                if($rootScope.URL[module] && $rootScope.URL[module][arr]){
                    return true;
                }
            }
            if (window.Array.isArray(arr)) {
                if(!$rootScope.URL[module]){
                    return false;
                }
                arr.forEach(function(item) {
                    if($rootScope.URL[module][item]){
                        result = true;
                    }
                });
                return result;
            }
            return false;
        };

        /**
         *
         * @param data 重复的项目
         * @param id 重复项的id
         * @returns {string}
         */
        $scope.showAddOrDetail = function(data, id) {
            if($scope.validIsNew(id)){
                return '新增';
            }
            if(window.Array.isArray(data) && data.length){
                return '明细';
            } else if (window.Array.isArray(data) && !data.length){
                return '新增';
            }
            return '';
        };

        /**
         * 用正则进行验证
         * @param Reg 正则表达式
         * @param str 传入的字符串
         * @param msg 提示信息
         */
        $scope.validReg = function (Reg,str,msg) {
            if(!str){
                return msg;
            }
            var tempReg = new RegExp(Reg);
            if(tempReg.test(str)){
                return true;
            }else{
                return msg;
            }
        };

        $scope.getUrlParams = function GetRequest() {
            var url = window.location.href; //获取url中"?"符后的字串
            var theRequest = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(url.indexOf("?")+1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[decodeURIComponent(strs[i].split("=")[0])]=decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        };


        /**
         *
         * @param data 传入的值是否为空
         * @return {string}
         */

        $scope.checkRequiredData = function(data) {
            if (typeof data !=='boolean' && !data) {
                return $translate.instant('required_message');
            }
        };

        /**
         *
         * @param msg string
         */

        // 全局报错机制成功
        $rootScope.toasterSuccess = function (msg) {
            toaster.pop({
                type: 'success',
                title: $translate.instant('alert_confirm.success'),
                body: msg,
                showCloseButton: true,
                timeout: 2000
            })
        };

        $rootScope.toasterInfo = function (msg) {
            toaster.pop({
                type: 'info',
                title: $translate.instant('alert_confirm.info'),
                body: msg,
                showCloseButton: true,
                timeout: 0
            });
        };

        $rootScope.alertErrorMsg = function (msg) {
            if(msg === 'Please Login First'){
                SweetAlert.swal({
                    title: $translate.instant('login'),
                    text: msg,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: $translate.instant('login'),
                    cancelButtonText: $translate.instant('alert_confirm.cancelButtonText'),
                    closeOnConfirm: true
                }, function(yes) {
                    if (yes) {
                        window.location.href='/login.html'
                    }
                });
            }else{
                SweetAlert.error($translate.instant('alert_confirm.error'), msg);
            }
        };


        $rootScope.dateOptionsYYYMMDD = {
            useCurrent: false,
            showClose: true,
            showClear: true,
            locale: $rootScope.language.selected || 'en',
            format: 'YYYY-MM-DD'
        };

        $rootScope.dateOptionsYYYMMDDHHmmss = {
            useCurrent: false,
            showClose: true,
            showClear: true,
            locale: $rootScope.language.selected || 'en',
            format: 'YYYY-MM-DD HH:mm:ss'
        };

        $rootScope.showArrayName = function(arr) {
            if(window.Array.isArray(arr)){
                for(var i=0,j=arr.length;i<j;i++){
                    if(arr[i].locale == locale){
                        return arr[i].value || '';
                        break;
                    }
                }
                if(arr[0]){
                    return arr[0].value || ''
                }
            }else if(typeof arr === 'object'){
                return arr[locale] || ''
            }
            return '';
        };

        $scope.formatTime = function(str) {
            if(!str){
                return '';
            }
            return new window.moment(str).format($rootScope.dateOptionsYYYMMDDHHmmss.format)
        };

        /**
         *
         * @param callback 回调函数
         */

        // 删除确认
        $rootScope.alertConfirm = function (callback,type) {
            if(type == 'recover'){
                SweetAlert.swal({
                    title: $translate.instant('alert_recover.title'),
                    text: $translate.instant('alert_recover.text'),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#37bc9b',
                    confirmButtonText: $translate.instant('alert_recover.confirmButtonText'),
                    cancelButtonText: $translate.instant('alert_recover.cancelButtonText'),
                    closeOnConfirm: true
                }, function(yes) {
                    if (yes) {
                        callback();
                    }
                });
            }else{
                SweetAlert.swal({
                    title: $translate.instant('alert_confirm.title'),
                    text: $translate.instant('alert_confirm.text'),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: $translate.instant('alert_confirm.confirmButtonText'),
                    cancelButtonText: $translate.instant('alert_confirm.cancelButtonText'),
                    closeOnConfirm: true
                }, function(yes) {
                    if (yes) {
                        callback();
                    }
                });
            }

        };
    }

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('customeInterceptor', customeInterceptor);

    customeInterceptor.$inject = ['$rootScope', '$timeout', '$injector', '$q','$window'];

    function customeInterceptor($rootScope, $timeout, $injector, $q, $window) {
        var requestInitiated;

        function showLoadingText() {
            $rootScope.isShowLoadingSpinner = true;
        };

        function hideLoadingText() {
            $rootScope.isShowLoadingSpinner = false;
        };

        return {
            request: function (config) {
                if(config.headers && config.headers._loading === false){
                    delete config.headers._loading;
                }else{
                    requestInitiated = true;
                    showLoadingText();
                }
                return config;
            },
            response: function (response) {
                requestInitiated = false;

                // Show delay of 300ms so the popup will not appear for multiple http request
                $timeout(function () {

                    if (requestInitiated) return;
                    hideLoadingText();

                }, 400);

                return response;
            },
            requestError: function (err) {
                hideLoadingText();
                return err;
            },
            responseError: function (err) {
                hideLoadingText();
                return $q.reject(err);
            }
        }
    }

})();
(function() {


    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = [
        '$rootScope',
        '$state',
        '$stateParams',
        '$window',
        '$templateCache',
        'Colors',
        '$translate',
        'SweetAlert',
        'toaster'
    ];

    function appRun(
        $rootScope,
        $state,
        $stateParams,
        $window,
        $templateCache,
        Colors,
        $translate,
        SweetAlert,
        toaster
    ) {

        if (typeof window.Object.assign != 'function') {
            window.Object.assign = function(target, varArgs) {
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            };
        }

        // Hook into ocLazyLoad to setup AngularGrid before inject into the app
        // See "Creating the AngularJS Module" at
        // https://www.ag-grid.com/best-angularjs-data-grid/index.php
        var offevent = $rootScope.$on('ocLazyLoad.fileLoaded', function(e, file) {
            if (file.indexOf('ag-grid.js') > -1) {
                agGrid.initialiseAgGridWithAngular1(angular);
                offevent();
            }
        });

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$translate = $translate;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // Uncomment this to disable template cache
        // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //     if (typeof(toState) !== 'undefined'){
        //       $templateCache.remove(toState.templateUrl);
        //     }
        // });

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // -----------------------------------

        // Hook not start
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                if(toState.permission){
                    if(window.userInfo && window.userInfo.module && window.userInfo.module.indexOf(toState.permission) == -1){
                        $state.go('page.403')
                    }
                }

            });

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function(event, unfoundState /* , fromState, fromParams */) {
                $state.go('page.maintenance')
            });
        // Hook error
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
                $state.go("page.maintenance");
            });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                // $rootScope.currTitle = $state.current.title;
                $window.document.title = $state.current.title;
            });

        // Load a title dynamically
        // $rootScope.currTitle = $state.current.title;
        // $rootScope.pageTitle = function() {
        //     var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        //     document.title = title;
        //     return title;
        // };

        $window.document.title = '';

    }

})();
(function (angular) {
    

    angular
        .module('app.core')
        .factory('userSelfService', userSelfService);

    userSelfService.$inject = ['$resource', 'EVN'];

    /* @ngInject */
    function userSelfService($resource, EVN) {
        return $resource(EVN.server + '/user/:action',
            {},
            {
                // 获取用户自己的信息
                getUserSelfInfo: {
                    method: 'GET',
                    params: {
                        action: 'getUserInfo' + EVN.suffix
                    }
                },
                // 用户登出
                getUserLogout: {
                    method: 'GET',
                    params: {
                        action: 'logout' + EVN.suffix
                    }
                },

            }
        );
    }

})(angular);


(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {


    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'whirl': ['vendor/whirl/dist/whirl.css'],
                'animo': ['vendor/animo.js/animo.js'],
                'fastclick': ['vendor/fastclick/lib/fastclick.js'],
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                'animate': ['vendor/animate.css/animate.min.css'],
                'skycons': ['vendor/skycons/skycons.js'],
                'icons': [
                    'vendor/fontawesome/css/font-awesome.min.css',
                    'vendor/simple-line-icons/css/simple-line-icons.css'
                ],
                'weather-icons': [
                    'vendor/weather-icons/css/weather-icons.min.css',
                    'vendor/weather-icons/css/weather-icons-wind.min.css'
                ],
                'sparklines': ['vendor/sparkline/index.js'],
                'wysiwyg': [
                    'vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'
                ],
                'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
                'screenfull': ['vendor/screenfull/dist/screenfull.js'],
                'vector-map': [
                    'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'
                ],
                'vector-map-maps': [
                    'vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'
                ],
                'moment': ['vendor/moment/min/moment-with-locales.min.js'],
                'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
                'flatdoc': ['vendor/flatdoc/flatdoc.js'],
                'codemirror': [
                    'vendor/codemirror/lib/codemirror.js',
                    'vendor/codemirror/lib/codemirror.css'
                ],
                // modes for common web files
                'codemirror-modes-web': [
                    'vendor/codemirror/mode/javascript/javascript.js',
                    'vendor/codemirror/mode/xml/xml.js',
                    'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                    'vendor/codemirror/mode/css/css.js'
                ],
                'taginput': [
                    'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'
                ],
                'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'ngFileUploadShim': ['vendor/ng-file-upload-shim/ng-file-upload.min.js'],
                'morris': [
                    'vendor/raphael/raphael.js',
                    'vendor/morris.js/morris.js',
                    'vendor/morris.js/morris.css'
                ],
                'loaders.css': ['vendor/loaders.css/loaders.css'],
                'spinkit': ['vendor/spinkit/css/spinkit.css']
            },
            // Angular based script (use the right module name)
            modules: [
                {
                    name: 'toaster',
                    files: [
                        'vendor/angularjs-toaster/toaster.js',
                        'vendor/angularjs-toaster/toaster.css'
                    ]
                },
                {
                    name: 'localytics.directives',
                    files: [
                        'vendor/chosen_v1.2.0/chosen.jquery.min.js',
                        'vendor/chosen_v1.2.0/chosen.min.css',
                        'vendor/angular-chosen-localytics/dist/angular-chosen.js'
                    ],
                    serie: true
                },
                {
                    name: 'ngWig',
                    files: ['vendor/ngWig/dist/ng-wig.min.js']
                },
                {
                    name: 'ngTable',
                    files: [
                        'vendor/ng-table/dist/ng-table.min.js',
                        'vendor/ng-table/dist/ng-table.min.css'
                    ]
                },
                {
                    name: 'ngTableExport',
                    files: ['vendor/ng-table-export/ng-table-export.js']
                },
                {
                    name: 'xeditable',
                    files: [
                        'vendor/angular-xeditable/dist/js/xeditable.js',
                        'vendor/angular-xeditable/dist/css/xeditable.css'
                    ]
                },
                {
                    name: 'angularFileUpload',
                    files: ['vendor/angular-file-upload/dist/angular-file-upload.js']
                },
                {
                    name: 'ngImgCrop',
                    files: [
                        'vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                        'vendor/ng-img-crop/compile/unminified/ng-img-crop.css'
                    ]
                },
                {
                    name: 'ui.select',
                    files: [
                        'vendor/angular-ui-select/dist/select.js',
                        'vendor/angular-ui-select/dist/select.css'
                    ]
                },
                {
                    name: 'ui.codemirror',
                    files: ['vendor/angular-ui-codemirror/ui-codemirror.js']
                },
                {
                    name: 'angular-carousel',
                    files: [
                        'vendor/angular-carousel/dist/angular-carousel.css',
                        'vendor/angular-carousel/dist/angular-carousel.js'
                    ]
                },
                {
                    name: 'infinite-scroll',
                    files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']
                },
                {
                    name: 'ui.bootstrap-slider',
                    files: [
                        'vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                        'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                        'vendor/angular-bootstrap-slider/slider.js'
                    ],
                    serie: true
                },
                {
                    name: 'ui.grid',
                    files: [
                        'vendor/angular-ui-grid/ui-grid.min.css',
                        'vendor/angular-ui-grid/ui-grid.min.js'
                    ]
                },
                {
                    name: 'summernote',
                    files: [
                        'vendor/bootstrap/js/modal.js',
                        'vendor/bootstrap/js/dropdown.js',
                        'vendor/bootstrap/js/tooltip.js',
                        'vendor/summernote/dist/summernote.css',
                        'vendor/summernote/dist/summernote.js',
                        //'vendor/summernote/dist/lang/summernote-es-ES.js',
                        //'vendor/summernote/dist/lang/summernote-zh-CN.js',
                        'vendor/angular-summernote/dist/angular-summernote.js'
                    ],
                    serie: true
                },
                {
                    name: 'angular-rickshaw',
                    files: [
                        'vendor/d3/d3.min.js',
                        'vendor/rickshaw/rickshaw.js',
                        'vendor/rickshaw/rickshaw.min.css',
                        'vendor/angular-rickshaw/rickshaw.js'
                    ],
                    serie: true
                },
                {
                    name: 'angular-chartist',
                    files: [
                        'vendor/chartist/dist/chartist.min.css',
                        'vendor/chartist/dist/chartist.js',
                        'vendor/angular-chartist.js/dist/angular-chartist.js'
                    ],
                    serie: true
                },
                {
                    name: 'ui.map',
                    files: ['vendor/angular-ui-map/ui-map.js']
                },
                {
                    name: 'angular-jqcloud',
                    files: [
                        'vendor/jqcloud2/dist/jqcloud.css',
                        'vendor/jqcloud2/dist/jqcloud.js',
                        'vendor/angular-jqcloud/angular-jqcloud.js'
                    ]
                },
                {
                    name: 'angularGrid',
                    files: [
                        'vendor/ag-grid/dist/styles/ag-grid.css',
                        'vendor/ag-grid/dist/ag-grid.js',
                        'vendor/ag-grid/dist/styles/theme-dark.css',
                        'vendor/ag-grid/dist/styles/theme-fresh.css'
                    ]
                },
                {
                    name: 'ng-nestable',
                    files: [
                        'vendor/ng-nestable/src/angular-nestable.js',
                        'vendor/nestable/jquery.nestable.js'
                    ]
                },
                {
                    name: 'akoenig.deckgrid',
                    files: ['vendor/angular-deckgrid/angular-deckgrid.js']
                },
                {
                    name: 'oitozero.ngSweetAlert',
                    files: [
                        'vendor/sweetalert/dist/sweetalert.css',
                        'vendor/sweetalert/dist/sweetalert.min.js',
                        'vendor/angular-sweetalert/SweetAlert.js'
                    ],
                    serie: true
                },
                {
                    name: 'bm.bsTour',
                    files: [
                        'vendor/bootstrap-tour/build/css/bootstrap-tour.css',
                        'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                        'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'
                    ],
                    serie: true
                },
                {
                    name: 'ui.knob',
                    files: [
                        'vendor/angular-knob/src/angular-knob.js',
                        'vendor/jquery-knob/dist/jquery.knob.min.js'
                    ]
                },
                {
                    name: 'ui.sortable',
                    files: [
                        'vendor/jquery-ui/jquery-ui.min.js',
                        'vendor/angular-ui-sortable/sortable.js'
                    ],
                    serie: true
                },
                {
                    name: 'ui.calendar',
                    files: [
                        'vendor/jquery-ui/jquery-ui.min.js',
                        'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                        'vendor/fullcalendar/dist/fullcalendar.min.js',
                        'vendor/fullcalendar/dist/gcal.js',
                        'vendor/fullcalendar/dist/fullcalendar.css',
                        'vendor/angular-ui-calendar/src/calendar.js'
                    ],
                    serie: true
                },
                {
                    name: 'superAdmin',
                    files: ['js/superAdmin.js'],
                    serie: true
                },
                {
                    name: 'admin',
                    files: ['js/admin.js'],
                    serie: true
                },
                {
                    name: 'login',
                    files: ['js/login.js'],
                    serie: true
                },
                {
                    name: 'changePassword',
                    files: ['js/changePassword.js'],
                    serie: true
                },
                {
                    name: 'datetimepicker',
                    files: [
                        'vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                        'vendor/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                        'vendor/eonasdan-bootstrap-datetimepicker/angular/angular-eonasdan-datetimepicker.js'
                    ],
                    serie: true
                },
                {
                    name: 'pusher-angular',
                    files: [
                        'vendor/pusher-js/dist/web/pusher.min.js',
                        'vendor/pusher-angular/lib/pusher-angular.min.js'
                    ],
                    serie: true
                },
            ]
        });
})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              console.log(viewsLoaded,'viewsLoaded')
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 1000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/** =========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 ========================================================= */

(function() {

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider);

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

        /* jshint validthis:true */
        return {
        // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            // controller access level
            $get: function() {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return 'views/' + uri;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function') { return promise.then(_arg) }
                        else { return promise.then(function() {
                            // if is a module, pass the name. If not, pass the array
                            var whatToLoad = getRequired(_arg);
                            // simple error check
                            if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            // finally, return a promise
                            return $ocLazyLoad.load(whatToLoad);
                        }); }
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules) {
                            for (var m in APP_REQUIRES.modules) {
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name) {
                                    return APP_REQUIRES.modules[m];
                                }
                            }
                        }
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        } // resolveFor

    }


})();


(function() {


    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = [
        '$rootScope',
        '$localStorage',
        'userSelfService',
        'SweetAlert',
        '$translate'
    ];

    function settingsRun(
        $rootScope,
        $localStorage,
        userSelfService,
        SweetAlert,
        $translate
    ) {


        // User Settings
        // -----------------------------------
        $rootScope.user = {
            system: 'admin',
            name: 'admin'
        };

        // Hides/show user avatar on sidebar from any element
        $rootScope.toggleUserBlock = function() {
            $rootScope.$broadcast('toggleUserBlock');
        };

        $rootScope.userLogout = function () {
            SweetAlert.swal({
                title: 'logout',
                text: 'are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'logout',
                cancelButtonText: $translate.instant('alert_confirm.cancelButtonText'),
                closeOnConfirm: true
            }, function(yes) {
                if (yes) {
                    userSelfService.getUserLogout({},{}).$promise.then(function (data) {
                        window.location.href = '/login.html';
                    })
                }
            });
        };

        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'Angle',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: 'css/theme-e.css',
                asideScrollbar: false,
                isCollapsedText: false
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
        };

        console.log($rootScope.app.layout, '$rootScope.app.layout');

        // Setup the layout mode
        $rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout === 'app-h');

        // Restore layout settings
        if (angular.isDefined($localStorage.layout)) { $rootScope.app.layout = $localStorage.layout }
        else { $localStorage.layout = $rootScope.app.layout }

        $rootScope.$watch('app.layout', function () {
            $localStorage.layout = $rootScope.app.layout;
        }, true);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
            if (newValue === false) { $rootScope.$broadcast('closeSidebarMenu') }
        });

    }

})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage((window.navigator.language || window.navigator.language).indexOf('zh-CN') !== -1 ? 'zh-CN' : 'en-GB');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function () {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun);

    translateRun.$inject = ['$rootScope', '$translate', '$window'];

    function translateRun($rootScope, $translate, $window) {
        // Internationalization
        // ----------------------

        $rootScope.language = {
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
                $rootScope.language.selected = proposedLanguage || preferredLanguage;
            },
            set: function (localeId) {
                // Set the new idiom
                $translate.use(localeId);

                window.localStorage.setItem('NG_TRANSLATE_LANG_KEY',localeId);
                // save a reference for the current language
                $rootScope.language.selected = localeId;

                $window.location.reload();
            }
        };

        $rootScope.language.init();

    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .constant('SidebarMenuData', {
            superUser: [
                {
                    "text": "菜单管理",
                    "sref": "#",
                    "icon": "glyphicon glyphicon-th-large",
                    "submenu": [
                        {
                            "text": "菜单维护",
                            "sref": "superAdmin.menuManage",
                            "translate": "sidebar.nav.super_admin.MENU_MAINTAIN"
                        },
                        {
                            "text": "按钮维护",
                            "sref": "superAdmin.buttonManage",
                            "translate": "sidebar.nav.super_admin.BUTTON_MAINTAIN"
                        },
                    ],
                    "translate": "sidebar.nav.super_admin.MENU_MANAGE"
                },{
                    "text": "角色维护",
                    "sref": "#",
                    "icon": "glyphicon glyphicon-pawn",
                    "submenu": [
                        {
                            "text": "角色信息维护",
                            "sref": "superAdmin.roleInfoManage",
                            "translate": "sidebar.nav.super_admin.ROLE_INFO_MAINTAIN"
                        },
                        {
                            "text": "角色关联菜单",
                            "sref": "superAdmin.roleRelationManage",
                            "translate": "sidebar.nav.super_admin.ROLE_RELATE_MENU"
                        },
                    ],
                    "translate": "sidebar.nav.super_admin.ROLE_MAINTAIN"
                },{
                    "text": "管理员和角色",
                    "sref": "#",
                    "icon": "glyphicon glyphicon-tower",
                    "submenu": [
                        {
                            "text": "管理员信息维护",
                            "sref": "superAdmin.adminInfoManage",
                            "translate": "sidebar.nav.super_admin.ADMIN_INFO"
                        },
                        {
                            "text": "管理员关联角色",
                            "sref": "superAdmin.adminRelationManage",
                            "translate": "sidebar.nav.super_admin.ADMIN_RELATE_ROLE"
                        },
                        {
                            "text": "管理员日志",
                            "sref": "superAdmin.adminLog",
                            "translate": "sidebar.nav.super_admin.ADMIN_LOG"
                        },
                    ],
                    "translate": "sidebar.nav.super_admin.ADMIN_AND_ROLE"
                },
            ],
            admin: [
                {
                    "text": "本地语言",
                    "sref": "admin.localeLanguage",
                    "module": "locales",
                },
                {
                    "text": "国家管理",
                    "sref": "admin.countriesManage",
                    "module": "countries",
                },
                {
                    "text": "财务明细",
                    "sref": "admin.transactionsDetail",
                    "module": "transactions",
                },
                {
                    "text": "货币管理",
                    "sref": "admin.currenciesManage",
                    "module": "currencies",
                },
                {
                    "text": "银行黑名单",
                    "sref": "admin.blackLists",
                    "module": "blacklists",
                },
                {
                    "text": "用户等级",
                    "sref": "admin.userLevel",
                    "module": "ranks",
                },
                {
                    "text": "充值管理",
                    "sref": "admin.ordersManage",
                    "module": "orders",
                },
                {
                    "text": "支付渠道",
                    "sref": "admin.paymentMethods",
                    "module": "methods",
                },
                {
                    "text": "优惠券使用",
                    "sref": "admin.appliesUse",
                    "module": "applies",
                },
                {
                    "text": "游戏品牌",
                    "sref": "admin.gameBrands",
                    "module": "brands",
                },
                {
                    "text": "游戏种类",
                    "sref": "admin.gameCategories",
                    "module": "categories",
                },
                {
                    "text": "优惠券管理",
                    "sref": "admin.couponsManage",
                    "module": "coupons",
                },
                {
                    "text": "游戏管理",
                    "sref": "admin.gamesManage",
                    "module": "games",
                },
                {
                    "text": "游戏产品",
                    "sref": "admin.gamesProducts",
                    "module": "products",
                },
                {
                    "text": "psp管理",
                    "sref": "admin.pspsManage",
                    "module": "psps",
                },
                {
                    "text": "提款管理",
                    "sref": "admin.withdrawsManage",
                    "module": "withdraws",
                },
                {
                    "text": "优惠活动",
                    "sref": "admin.promotionsManage",
                    "module": "promotions",
                },
                {
                    "text": "返水列表",
                    "sref": "admin.rebatesList",
                    "module": "rebates",
                },
                {
                    "text": "救济金列表",
                    "sref": "admin.reliefsList",
                    "module": "reliefs",
                },
                {
                    "text": "转账列表",
                    "sref": "admin.transfersList",
                    "module": "transfers",
                },
                {
                    "text": "游戏记录",
                    "sref": "admin.gameRecords",
                    "module": "records",
                },
                {
                    "text": "用户管理",
                    "sref": "admin.usersManage",
                    "module": "users",
                },
                {
                    "text": "钱包管理",
                    "sref": "admin.walletsManage",
                    "module": "wallets",
                },
                {
                    "text": "千百倍",
                    "sref": "admin.bigwinsManage",
                    "module": "bigwins",
                },
                {
                    "text": "域名管理",
                    "sref": "admin.domainsManage",
                    "module": "domains",
                },
                {
                    "text": "代理管理",
                    "sref": "admin.affiliatesManage",
                    "module": "affiliates",
                },
                {
                    "text": "代理计划",
                    "sref": "admin.affiliatesPlans",
                    "module": "plans",
                },
                {
                    "text": "银行卡搜索",
                    "sref": "admin.bankCards",
                    "module": "cards",
                },
                {
                    "text": "媒体目录",
                    "sref": "admin.mediaCategories",
                    "module": "mediaCategories",
                },
                {
                    "text": "媒体文件",
                    "sref": "admin.mediaFiles",
                    "module": "media",
                },
                // superAdmin 模块
                {
                    "text": "菜单维护",
                    "sref": "admin.menuManage",
                    "module": "manageMenu",
                },
                {
                    "text": "按钮维护",
                    "sref": "admin.buttonManage",
                    "module": "manageButton",
                },
                {
                    "text": "角色信息维护",
                    "sref": "admin.roleInfoManage",
                    "module": "manageRole",
                },
                {
                    "text": "角色关联菜单",
                    "sref": "admin.roleRelationManage",
                    "module": "manageRoleMenu",
                },
                {
                    "text": "管理员维护",
                    "sref": "admin.adminInfoManage",
                    "module": "manageAdminUser",
                },
                {
                    "text": "管理员关联角色",
                    "sref": "admin.adminRelationManage",
                    "module": "manageAdminRole",
                },
                {
                    "text": "管理员日志",
                    "sref": "admin.adminLog",
                    "module": "manageOptLog",
                }//new sidebar name will be append here
            
            
            
            
            ]

        });

})();
/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarMenuData', 'Utils', 'EVN'];

    function SidebarController($rootScope, $scope, $state, SidebarMenuData, Utils, EVN) {

        activate();

        ////////////////

        function activate() {
            var collapseList = [];

            // demo: when switch from collapse to hover, close all items
            var watchOff1 = $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
                if (newVal === false && oldVal === true) {
                    closeAllBut(-1);
                }
            });

            $scope.menuItems = [];

            if (window.location.pathname.indexOf('superAdmin') !== -1) {
                $scope.menuItems = SidebarMenuData.superUser;
            } else {
                if(window.userInfo&&window.userInfo.menu){
                    $scope.menuItems = window.userInfo.menu;
                }else{
                    console.error('server error')
                }
            }

            // Handle sidebar and collapse items
            // ----------------------------------

            $scope.getMenuItemPropClasses = function (item) {
                return (item.heading ? 'nav-heading' : '') +
                    (isActive(item) ? ' active' : '');
            };

            $scope.addCollapse = function ($index, item) {
                collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
            };

            $scope.isCollapse = function ($index) {
                return (collapseList[$index]);
            };

            $scope.toggleCollapse = function ($index, isParentItem) {

                // collapsed sidebar doesn't toggle drodopwn
                if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

                // make sure the item index exists
                if (angular.isDefined(collapseList[$index])) {
                    if (!$scope.lastEventFromChild) {
                        collapseList[$index] = !collapseList[$index];
                        closeAllBut($index);
                    }
                }
                else if (isParentItem) {
                    closeAllBut(-1);
                }

                $scope.lastEventFromChild = isChild($index);

                return true;

            };

            // Controller helpers
            // -----------------------------------

            // Check item and children active state
            function isActive(item) {

                if (!item) return;

                if (!item.sref || item.sref === '#') {
                    var foundActive = false;
                    angular.forEach(item.submenu, function (value) {
                        if (isActive(value)) foundActive = true;
                    });
                    return foundActive;
                }
                else
                    return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
                index += '';
                for (var i in collapseList) {
                    if (index < 0 || index.indexOf(i) < 0)
                        collapseList[i] = true;
                }
            }

            function isChild($index) {
                /*jshint -W018*/
                return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function () {
                watchOff1();
            });

        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar
              sidebarAddBackdrop();

            }

          });

          var eventOff1 = scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize.sidebar', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';

            var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }

          scope.$on('$destroy', function() {
            // detach scope events
            eventOff1();
            eventOff2();
            watchOff1();
            // detach dom events
            $sidebar.off(eventName);
            $win.off('resize.sidebar');
            wrapper.off(sbclickEvent);
          });

        }

        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');

          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );

          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope'];
    function UserBlockController($scope) {

        // activate();
        //
        // ////////////////
        //
        // function activate() {
        //
        //   $scope.userBlockVisible = true;
        //
        //   var detach = $scope.$on('toggleUserBlock', function(/*event, args*/) {
        //
        //     $scope.userBlockVisible = ! $scope.userBlockVisible;
        //
        //   });
        //
        //   $scope.$on('$destroy', detach);
        // }
    }
})();

/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**
 * Created by wlwang on 2017/2/23.
 */

//隐藏左侧导航
(function (angular) {
    'use strict';

    angular
        .module('app.utils')
        .directive('serverDataTable', serverDataTable)
        .directive('serverDataTableSort', serverDataTableSort);

    serverDataTable.$inject = ['$injector','$timeout','$rootScope'];

    /* @ngInject */
    function serverDataTable($injector,$timeout,$rootScope) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                aoData: '=aoData',
                items: '=items',
                url: '=url',
                serviceName: '@serviceName',
                serviceNameAttr: '@serviceNameAttr',
                reload: '=reload',
                handleData: '=',
            },
            template:
                '<div class="clearfix"></div>\
                <div ng-transclude></div>\
                <div class="table-bottom-notice">\
                    <span class="pull-left" style="margin-bottom: 15px">\
                        {{"table.common.per_page" | translate}}\
                        <select  class="form-control" style="display: inline;width: auto"  ng-model="pageNumber"  ng-options="pageNumber as pageNumber for pageNumber in [25,50,100]"></select>\
                    </span>\
                    <span class="pull-left">{{"table.common.showing_item_to" | translate:{from:(currentPage-1)*pageNumber+1||0,to:currentPage*pageNumber>=pageMessage.count?pageMessage.count:currentPage*pageNumber,totalItem:pageMessage.count||0 } }}</span>\
                    <span class="pull-right">\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage-1" ng-hide="currentPage<=1||items.length==0">\
                            <span class="glyphicon glyphicon-arrow-left" ></span>\
                        </button>\
                        <span ng-hide="items.length==0">{{"table.common.cur_page_first" | translate}}</span><input ng-hide="items.length==0" class="form-control" type="number"  ng-model="currentPage" style="display: inline;max-width: 150px!important;" ng-style="{width:currentPage.toString().length*6+55+\'px\'}"><span ng-hide="items.length==0">{{"table.common.cur_page_last" | translate}}</span>\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage+1" ng-hide="currentPage>=pageTotle||items.length==0">\
                            <span class="glyphicon glyphicon-arrow-right" ></span>\
                        </button>\
                        <span ng-if="items.length!==0">|{{"table.common.total_page" | translate:{totalPage:pageTotle} }}| </span>\
                        <span ng-if="items.length==0">|{{"table.common.total_page" | translate:{totalPage:1} }}| </span>\
                    </span>\
                </div>',
            controller: ["$scope", "$element", "$attrs", "$transclude", function ($scope, $element, $attrs, $transclude) {
                $scope.pageNumber = 25;
                $scope.currentPage = 1;
                $scope.TemDraw = 1;

                $scope.items = [];

                $scope.pageMessage = {};
                $scope.pageTotle = 0;

                if(!$scope.aoData){
                    $scope.aoData = {}
                    // throw new Error('没有填写输入搜索条件')
                }
                if(!$scope.serviceName||!$scope.serviceNameAttr){
                    // throw new Error('先注入服务名称和服务属性名称')
                }
                var service=$injector.get($scope.serviceName);

                $scope.pageNeedChange=false;
                $scope.$watch('[currentPage+pageNumber]',function(newValue,oldValue){
                    if (newValue!=oldValue)$scope.pageTotle=Math.ceil($scope.pageMessage.count/$scope.pageNumber)
                    if($scope.currentPage>=$scope.pageTotle)$scope.currentPage=$scope.pageTotle
                    if($scope.currentPage<=0)$scope.currentPage=1;
                    $scope.pageNeedChange=true;
                    $scope.aoData.page=$scope.currentPage;
                    $scope.aoData.pageSize=$scope.pageNumber;
                });

                var timeout = null;
                $scope.$watch('aoData',function(newVal,oldVal){
                    if (newVal!=oldVal) {

                        if($scope.pageNeedChange||$scope.currentPage==1){

                        }else{
                            $scope.currentPage=1;
                            return
                        }
                        if (timeout) {
                            $timeout.cancel(timeout)
                        }
                        timeout = $timeout(function(){
                            $scope.ServerPaging();
                            $scope.pageNeedChange=false
                        }, 200);
                    }else{
                        timeout = $timeout(function(){
                            $scope.ServerPaging();
                            $scope.pageNeedChange=false
                        }, 0);
                    }
                },true);
                $scope.$watch('reload',function(newVal,oldVal){
                    if (newVal!=oldVal) {
                        if($scope.pageNeedChange||$scope.currentPage==1){

                        }else{
                            $scope.currentPage=1;
                            return
                        }
                        if (timeout) {
                            $timeout.cancel(timeout)
                        }
                        timeout = $timeout(function(){
                            $scope.ServerPaging()
                        }, 200);
                    }
                });
                $scope.ServerPaging=function(){
                    var temAoData=angular.copy($scope.aoData);
                    if($scope.serviceName !== 'superAdminService'){
                        service[$scope.serviceNameAttr]($scope.url,temAoData,{}).then(function (data){
                            var result = data.data && data.data.data;
                            console.log(result, 'result')
                            if(result && result.data && result.meta){
                                $scope.pageMessage.count=angular.copy(result.meta.total);
                                $scope.pageTotle=angular.copy(result.meta.last_page);
                                if($scope.handleData){
                                    $scope.items=angular.copy($scope.handleData(result.data));
                                }else{
                                    $scope.items=angular.copy(result.data);
                                }
                            }else{
                                $scope.pageMessage.draw=angular.copy(data.data.draw||1);
                                $scope.pageMessage.count= 0;
                                $scope.pageTotle=1;
                                $scope.items=[];
                            }
                            if(data.success && data.success === false){
                                $rootScope.alertErrorMsg(data.msg||'')
                            }
                        });
                    }else{
                        service[$scope.serviceNameAttr]($scope.url,temAoData,{}).then(function (data){
                            console.log(data, '----ServerPaging')
                            if(data.data && data.data.draw && $scope.pageMessage.draw){
                                if(parseInt($scope.pageMessage.draw)<=parseInt(data.data.draw)){
                                    $scope.pageMessage.count=angular.copy(data.data.totalSize);
                                    $scope.pageTotle=angular.copy(data.data.totalPage);
                                    if($scope.handleData){
                                        $scope.items=angular.copy($scope.handleData(data.data.list));
                                    }else{
                                        $scope.items=angular.copy(data.data.list);
                                    }
                                }
                            }else{
                                $scope.pageMessage.draw=angular.copy(data.data.draw||1);
                                $scope.pageMessage.count=angular.copy(data.data.totalSize);
                                $scope.pageTotle=angular.copy(data.data.totalPage);
                                if($scope.handleData){
                                    $scope.items=angular.copy($scope.handleData(data.data.list));
                                }else{
                                    $scope.items=angular.copy(data.data.list);
                                }
                            }
                        });
                    }
                }
            }]
        }
    }

    serverDataTableSort.$inject = [];
    function serverDataTableSort(){
        return {
            restrict: 'AE',
            scope: {
                aoData: '=aoData',
                serverDataTableSort: '@serverDataTableSort',
            },
            controller: ["$scope", "$element", "$attrs", function ($scope,$element,$attrs) {
                angular.element($element).on('click',function(){
                    $scope.sortValue($scope.serverDataTableSort)
                }).append('<i style="position: absolute;top: 11px;right: 4px"></i>').css('position','relative');
                angular.element($element).find('i').css('display','block')
                $scope.sortValue=function(name){
                    if($scope.aoData.sort && $scope.aoData.sort.indexOf(name) !== -1){
                        if($scope.aoData.sort.indexOf('desc') !== -1){
                            $scope.aoData.sort = name + '.asc'
                        }else {
                            $scope.aoData.sort = name + '.desc'
                        }
                    }else{
                        $scope.aoData.sort = name + '.desc'
                    }
                    $scope.$parent.$apply();
                };
                $scope.$watch('aoData.sort',function(){
                    var className='';
                    if($scope.aoData.sort && $scope.aoData.sort.indexOf($scope.serverDataTableSort) !== -1){
                        if($scope.aoData.sort.indexOf('desc') !== -1){
                            className='glyphicon glyphicon-sort-by-attributes-alt pull-right'
                        }else{
                            className='glyphicon glyphicon-sort-by-attributes pull-right'
                        }
                    }else{
                        className='glyphicon glyphicon-sort pull-right'
                    }
                    angular.element($element).find('i').removeClass().addClass(className)
                })
            }]
        }
    }

})(angular);

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },

          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

/**
 * Created by wlwang on 2017/2/23.
 */

// 隐藏左侧导航
(function (angular) {


    angular
        .module('app.utils')
        .directive('webDataTable', webDataTable)
        .directive('webDataTableSort', webDataTableSort);

    webDataTable.$inject = ['$timeout', '$filter'];

    /* @ngInject */
    function webDataTable($timeout, $filter) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                aoData: '=aoData',
                items: '=items',
                search: '=search',
                showItems: '=showItems',
                reload: '=reload',
            },
            template:
                '<div class="">\
                </div>\
                <div class="clearfix"></div>\
                <div ng-transclude></div>\
                <div class="table-bottom-notice">\
                    <span class="pull-left" style="margin-bottom: 15px">\
                    {{"table.common.per_page" | translate}}\
                        <select  class="form-control" style="display: inline;width: auto"   ng-model="pageNumber"  ng-options="pageNumber as pageNumber for pageNumber in [25,50,100]"></select>\
                    </span>\
                    <span class="pull-left" \
                        ng-hide="items.length==0">\
                        {{"table.common.showing_item_to" | translate:{from:(currentPage-1)*pageNumber+1||0,to:currentPage*pageNumber>=filterItems.length?filterItems.length:currentPage*pageNumber,totalItem:filterItems.length||0 } }}</span>\
                    <span class="pull-right">\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage-1" ng-hide="currentPage<=1||items.length==0">\
                            <span class="glyphicon glyphicon-arrow-left" ></span>\
                        </button>\
                        <span>{{"table.common.cur_page_first" | translate}}</span><input ng-hide="items.length==0" class="form-control" type="number"  ng-model="currentPage" style="display: inline;max-width: 150px!important;" ng-style="{width:currentPage.toString().length*6+55+\'px\'}"><span ng-hide="items.length==0">{{"table.common.cur_page_last" | translate}}</span>\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage+1" ng-hide="currentPage>=pageTotle||items.length==0">\
                            <span class="glyphicon glyphicon-arrow-right" ></span>\
                        </button>\
                        <span ng-if="items.length!==0">|{{"table.common.total_page" | translate:{totalPage:pageTotle} }}| </span>\
                        <span ng-if="items.length==0">|{{"table.common.total_page" | translate:{totalPage:1} }}| </span>\
                    </span>\
                </div>',
            controller: ["$scope", "$element", "$attrs", "$transclude", function ($scope, $element, $attrs, $transclude) {
                $scope.pageNumber = 25;
                $scope.currentPage = 1;

                if (!$scope.aoData) {
                    $scope.aoData = {};
                    // throw new Error('没有填写输入搜索条件')
                }

                if (!$scope.search) {
                    $scope.search = '';
                }
                $scope.filterItems = [];
                $scope.pageNeedChange = false;
                $scope.$watch('[currentPage+pageNumber+showItems.length]', function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        $scope.pageTotle = Math.ceil($scope.filterItems.length / $scope.pageNumber);
                    }
                    if ($scope.currentPage >= $scope.pageTotle)$scope.currentPage = $scope.pageTotle;
                    if ($scope.currentPage <= 0)$scope.currentPage = 1;
                    $scope.pageNeedChange = true;
                    $scope.ServerPaging();
                });

                var timeout = null;
                $scope.$watch('aoData', function(newVal, oldVal) {
                    if (newVal != oldVal) {
                        console.log($scope.aoData, '$scope.aoData');
                        if ($scope.pageNeedChange || $scope.currentPage == 1) {

                        } else {
                            $scope.currentPage = 1;
                            return;
                        }
                        if (timeout) {
                            $timeout.cancel(timeout);
                        }
                        timeout = $timeout(function() {
                            $scope.ServerPaging();
                            $scope.pageNeedChange = false;
                        }, 200);
                    } else {
                        timeout = $timeout(function() {
                            $scope.ServerPaging();
                            $scope.pageNeedChange = false;
                        }, 0);
                    }
                }, true);
                $scope.$watch('[reload + items.length+search]', function(newVal, oldVal) {
                    if (newVal != oldVal) {
                        if ($scope.pageNeedChange || $scope.currentPage == 1) {

                        } else {
                            $scope.currentPage = 1;
                            return;
                        }
                        if (timeout) {
                            $timeout.cancel(timeout);
                        }
                        timeout = $timeout(function() {
                            $scope.ServerPaging();
                        }, 200);
                    }
                });
                $scope.ServerPaging = function() {
                    var temAoData = angular.copy($scope.aoData);
                    var sortCol = '';
                    if (temAoData.sort_col !== undefined) {
                        sortCol = temAoData.sort_col;
                        delete temAoData.sort_col;
                    }
                    if (temAoData.sort_dir !== undefined) {
                        if (temAoData.sort_dir) {
                            sortCol = '-' + sortCol;
                        }
                        delete temAoData.sort_dir;
                    }
                    var tempFilterData = $filter('filter')($filter('filter')(angular.copy($scope.items), temAoData), $scope.search);
                    $scope.filterItems = $filter('orderBy')(tempFilterData, sortCol);
                    $scope.showItems = $filter('limitTo')($scope.filterItems, $scope.pageNumber, ($scope.currentPage - 1) * $scope.pageNumber);
                };
            }]
        };
    }

    webDataTableSort.$inject = [];
    function webDataTableSort() {
        return {
            restrict: 'AE',
            scope: {
                aoData: '=aoData',
                webDataTableSort: '@webDataTableSort',
            },
            controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
                angular.element($element).on('click', function() {
                    $scope.sortValue($scope.webDataTableSort);
                }).append('<i style="position: absolute;top: 12px;right: 4px"></i>').css('position', 'relative');

                $scope.sortValue = function(name) {
                    if ($scope.aoData.sort_col == name) {
                        if ($scope.aoData.sort_dir == true) {
                            $scope.aoData.sort_dir = false;
                        } else {
                            $scope.aoData.sort_dir = true;
                        }
                    } else {
                        $scope.aoData.sort_dir = true;
                    }
                    $scope.aoData.sort_col = name;
                    $scope.$parent.$apply();
                };

                $scope.$watch('aoData.sort_dir+aoData.sort_col', function() {
                    var className = '';
                    if ($scope.aoData.sort_col == $scope.webDataTableSort) {
                        if ($scope.aoData.sort_dir) {
                            className = 'glyphicon glyphicon-sort-by-attributes-alt pull-right';
                        } else {
                            className = 'glyphicon glyphicon-sort-by-attributes pull-right';
                        }
                    } else {
                        className = 'glyphicon glyphicon-sort pull-right';
                    }
                    angular.element($element).find('i').removeClass().addClass(className);
                });
            }]
        };
    }

})(angular);
