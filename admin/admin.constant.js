(function() {

    var suffix = '.json';
    angular
        .module('admin')
        .constant('URL',{
            COUNTRIESMANAGE:'/rest/countries' + suffix,
            LOCALELANGUAGE:'/rest/locales' + suffix,
            USERLEVEL:'/rest/ranks' + suffix,
        });
})();