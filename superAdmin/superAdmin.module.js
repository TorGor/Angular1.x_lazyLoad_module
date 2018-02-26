(function() {

    angular
        .module('superAdmin', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'superAdmin.menu',
            'superAdmin.button',
            'superAdmin.role',
            'superAdmin.admin',
        ]);
})();