(function() {
    'use strict';

    angular
        .module('superAdmin')
        .constant('EVN', {
            suffix: '.json',
            // server: 'http://madmin.ngrok.xiaomiqiu.cn'
            server: ''
        })
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
                }
            ],
            // 0-禁用；1-启用；2-删除；
            optionsSearch:[
                {
                    label: '全部',
                    value: ''
                },
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