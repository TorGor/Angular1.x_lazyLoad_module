(function() {

    angular
        .module('admin')
        .run(appRun);

    appRun.$inject = [
        '$rootScope',
        '$translate'
    ];

    function appRun(
        $rootScope,
        $translate
    ) {

        // 配置预设的url
        $rootScope.URL = {
            COUNTRIESMANAGE:{
                GET:'/rest/countries',
                POST:'/rest/countries',
                PATCH:'/rest/countries',
                DELETE:'/rest/countries',
                PUT:'/rest/countries/restore'
            },
            LOCALELANGUAGE:{
                GET:'/rest/locales',
                POST:'/rest/locales',
                PATCH:'/rest/locales',
                DELETE:'/rest/locales',
                PUT:'/rest/locales/restore'
            },
            USERLEVEL:{
                GET:'/rest/ranks',
                POST:'/rest/ranks',
                PATCH:'/rest/ranks',
                DELETE:'/rest/ranks',
                PUT:'/rest/ranks/restore'
            },
            TRANSACTIONSDETAIL:{
                GET:'/rest/transactions',
                POST:'/rest/transactions',
                PATCH:'/rest/transactions',
                DELETE:'/rest/transactions',
                PUT:'/rest/transactions/restore'
            },
            CURRENCIESMANAGE:{
                GET:'/rest/currencies',
                POST:'/rest/currencies',
                PATCH:'/rest/currencies',
                DELETE:'/rest/currencies',
                PUT:'/rest/currencies/restore'
            },
            BLACKLISTS:{
                GET:'/rest/blacklists',
                POST:'/rest/blacklists',
                PATCH:'/rest/blacklists',
                DELETE:'/rest/blacklists',
                PUT:'/rest/blacklists/restore'
            },
            ORDERSMANAGE:{
                GET:'/rest/orders',
                POST:'/rest/orders',
                PATCH:'/rest/orders',
                DELETE:'/rest/orders',
                PUT:'/rest/orders/restore'
            },
            PAYMENTMETHODS:{
                GET:'/rest/methods',
                POST:'/rest/methods',
                PATCH:'/rest/methods',
                DELETE:'/rest/methods',
                PUT:'/rest/methods/restore'
            },
        };

        $rootScope.adminSelect012 = {
            // 0-禁用；1-启用；
            options: [
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                }
            ],
            // 0-禁用；1-启用；2-删除；''-全部；
            optionsSearch: [
                {
                    label: $translate.instant('options.all'),
                    value: ''
                },
                {
                    label: $translate.instant('options.forbid'),
                    value: '0'
                },
                {
                    label: $translate.instant('options.enable'),
                    value: '1'
                },
                {
                    label: $translate.instant('options.delete'),
                    value: '2'
                }
            ]
        };

    }

})();