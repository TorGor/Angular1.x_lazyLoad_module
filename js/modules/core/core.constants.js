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