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
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
                    url: EVN.debug ? (EVN.server + url + EVN.suffix) : url,
                    params: params||{},
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: data ||{}
                });
            },
        };
    }

})(angular);

