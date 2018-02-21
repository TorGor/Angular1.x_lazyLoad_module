(function() {
    'use strict';

    angular
        .module('superAdmin.menu')
        .constant('superAdminSelect012',{
            // 0-禁用；1-启用；2-删除；
            options:[
                {
                    label: '禁用',
                    value: '0'
                },
                {
                    label: '启用',
                    value: '1'
                },
                {
                    label: '删除',
                    value: '2'
                }
            ]
        });
})();