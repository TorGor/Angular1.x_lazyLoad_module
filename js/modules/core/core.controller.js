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
         * 用正则进行验证
         * @param Reg 正则表达式
         * @param str 传入的字符串
         * @param msg 提示信息
         */
        $scope.validReg = function (Reg,str,msg) {
            var tempReg = new RegExp(Reg);
            if(tempReg.test(str)){
                return true;
            }else{
                return msg;
            }
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
            toaster.pop('success', $translate.instant('alert_confirm.success'), msg);
        };

        $rootScope.alertErrorMsg = function (msg) {
            SweetAlert.error($translate.instant('alert_confirm.error'), msg);
        };


        $rootScope.dateOptionsYYYMMDD = {
            useCurrent: false,
            locale: $rootScope.language.selected || 'en',
            format: 'YYYY-MM-DD'
        };

        $rootScope.dateOptionsYYYMMDDHHMM = {
            useCurrent: false,
            locale: $rootScope.language.selected || 'en',
            format: 'YYYY-MM-DD HH:MM'
        };

        /**
         *
         * @param callback 回调函数
         */

        // 删除确认
        $rootScope.alertConfirm = function (callback) {
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
        };
    }

})();