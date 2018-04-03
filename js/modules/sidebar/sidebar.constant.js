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
                }//new sidebar name will be append here
            
            
            
            
            
            
            ]

        });

})();