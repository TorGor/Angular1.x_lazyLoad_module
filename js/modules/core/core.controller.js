(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('MainController', MainController);

    MainController.$inject = [
        '$scope',
        '$rootScope',
        'SweetAlert',
        'toaster'
    ];

    function MainController(
        $scope,
        $rootScope,
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
            if(value == 0){
                return '<div class="label label-warning">禁用</div>';
            }else if(value == 1){
                return '<div class="label label-success">启用</div>';
            }else if(value == 2){
                return '<div class="label label-danger">删除</div>';
            }else{
                return '';
            }
        };

        /**
         *
         * @param data 传入的值是否为空
         * @return {string}
         */

        $scope.checkRequiredData = function(data){
            if(!data){
                return 'is required';
            }
        };

        /**
         *
         * @param msg string
         */

        // 全局报错机制成功
        $rootScope.toasterSuccess = function (msg) {
            toaster.pop('success', 'success', msg);
        };

        $rootScope.alertErrorMsg = function (msg) {
            SweetAlert.error('error message', msg)
        };


        $rootScope.dateOptionsYYYMMDD={
            useCurrent: false,
            locale: 'zh-cn',
            format: 'YYYY-MM-DD'
        };

        $rootScope.dateOptionsYYYMMDDHHMM={
            useCurrent: false,
            locale: 'zh-cn',
            format: 'YYYY-MM-DD HH:MM'
        };

        /**
         *
         * @param callback 回调函数
         */

        // 删除确认
        $rootScope.alertConfirm = function (callback) {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'Deleted data will not be able to recover!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: true
            }, function(yes){
                if(yes){
                    callback()
                }
            });
        };
    }

})();