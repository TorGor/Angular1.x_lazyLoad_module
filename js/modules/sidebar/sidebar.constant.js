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
                    "text": "本地语言",
                    "sref": "admin.localeLanguage",
                    "module": "",
                },
                {
                    "text": "国家管理",
                    "sref": "admin.countriesManage",
                    "module": "",
                },
                {
                    "text": "财务明细",
                    "sref": "admin.transactionsDetail",
                    "module": "",
                },
                {
                    "text": "货币管理",
                    "sref": "admin.currenciesManage",
                    "module": "",
                },
                {
                    "text": "银行黑名单",
                    "sref": "admin.blackLists",
                    "module": "",
                },
                {
                    "text": "用户等级",
                    "sref": "admin.userLevel",
                    "module": "",
                },
                {
                    "text": "充值管理",
                    "sref": "admin.ordersManage",
                    "module": "",
                },
                {
                    "text": "支付渠道",
                    "sref": "admin.paymentMethods",
                    "module": "",
                },
                {
                    "text": "优惠券使用",
                    "sref": "admin.appliesUse",
                    "module": "",
                },
                {
                    "text": "游戏品牌",
                    "sref": "admin.gameBrands",
                    "module": "",
                },
                {
                    "text": "游戏种类",
                    "sref": "admin.gameCategories",
                    "module": "",
                },
                {
                    "text": "优惠券管理",
                    "sref": "admin.couponsManage",
                    "module": "",
                },
                {
                    "text": "游戏管理",
                    "sref": "admin.gamesManage",
                    "module": "",
                },
                {
                    "text": "游戏产品",
                    "sref": "admin.gamesProducts",
                    "module": "",
                },
                {
                    "text": "psp管理",
                    "sref": "admin.pspsManage",
                    "module": "",
                },
                {
                    "text": "提款管理",
                    "sref": "admin.withdrawsManage",
                    "module": "",
                },
                {
                    "text": "优惠活动",
                    "sref": "admin.promotionsManage",
                    "module": "",
                },
                {
                    "text": "返水列表",
                    "sref": "admin.rebatesList",
                    "module": "",
                },
                {
                    "text": "救济金列表",
                    "sref": "admin.reliefsList",
                    "module": "",
                },
                {
                    "text": "转账列表",
                    "sref": "admin.transfersList",
                    "module": "",
                }//new sidebar name will be append here
            ]

        });

})();