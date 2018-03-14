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
                    ],
                    "translate": "sidebar.nav.super_admin.ADMIN_AND_ROLE"
                },
            ],
            admin: [
                {
                    "text": "已测接口",
                    "sref": "#",
                    "icon": "glyphicon glyphicon-th-large",
                    "submenu": [
                        {
                            "text": "本地语言",
                            "sref": "admin.localeLanguage",
                            "icon": "glyphicon glyphicon-th-large",
                        },
                        {
                            "text": "国家管理",
                            "sref": "admin.countriesManage",
                            "icon": "glyphicon glyphicon-th-large",
                        },
                        {
                            "text": "财务明细",
                            "sref": "admin.transactionsDetail",
                            "icon": "glyphicon glyphicon-th-large",
                        },
                        {
                            "text": "货币管理",
                            "sref": "admin.currenciesManage",
                            "icon": "glyphicon glyphicon-th-large",
                        },
                        {
                            "text": "银行黑名单",
                            "sref": "admin.blackLists",
                            "icon": "glyphicon glyphicon-th-large",
                        },
                    ]
                },
                {
                    "text": "用户等级",
                    "sref": "admin.userLevel",
                    "icon": "glyphicon glyphicon-th-large",
                },
                {
                    "text": "充值管理",
                    "sref": "admin.ordersManage",
                    "icon": "glyphicon glyphicon-th-large",
                },
                {
                    "text": "支付渠道",
                    "sref": "admin.paymentMethods",
                    "icon": "glyphicon glyphicon-th-large",
                }//new sidebar name will be append here
            
            ]

        });

})();