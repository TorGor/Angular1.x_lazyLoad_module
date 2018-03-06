(function() {

    angular
        .module('admin')
        .constant('URL',{
            COUNTRIESMANAGE:'/rest/countries',
            LOCALELANGUAGE:'/rest/locales',
            USERLEVEL:'/rest/ranks',
        });
})();