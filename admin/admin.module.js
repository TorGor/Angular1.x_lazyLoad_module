(function() {

    angular
        .module('admin', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
			'admin.localeLanguage',
			'admin.countriesManage',
			//new module name will be append here

        ]);
})();