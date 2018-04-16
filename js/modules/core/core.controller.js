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
            SweetAlert.error($translate.instant('alert_confirm.error'), msg);
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

        var locale = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY')||((window.navigator.language || window.navigator.language).indexOf('zh-CN') !== -1 ? 'zh-CN' : 'en-GB');

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