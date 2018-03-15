(function() {


    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = [
        '$rootScope',
        '$localStorage',
        'userSelfService',
        '$translate'
    ];

    function settingsRun(
        $rootScope,
        $localStorage,
        userSelfService,
        $translate
    ) {


        // User Settings
        // -----------------------------------
        $rootScope.user = {
            system: 'admin',
            name: 'admin'
        };

        // Hides/show user avatar on sidebar from any element
        $rootScope.toggleUserBlock = function() {
            $rootScope.$broadcast('toggleUserBlock');
        };

        $rootScope.userLogout = function () {
            console.log(userSelfService.getUserLogout)
            userSelfService.getUserLogout({},{}).$promise.then(function (data) {
                window.location.href = '/login.html'
                if (typeof data.success === 'boolean') {
                    if (data.success) {

                    } else {
                        $rootScope.alertErrorMsg(data.msg);
                    }
                }
            })
        };

        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'Angle',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: 'css/theme-e.css',
                asideScrollbar: false,
                isCollapsedText: false
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
        };

        console.log($rootScope.app.layout, '$rootScope.app.layout');

        // Setup the layout mode
        $rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout === 'app-h');

        // Restore layout settings
        if (angular.isDefined($localStorage.layout)) { $rootScope.app.layout = $localStorage.layout }
        else { $localStorage.layout = $rootScope.app.layout }

        $rootScope.$watch('app.layout', function () {
            $localStorage.layout = $rootScope.app.layout;
        }, true);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
            if (newValue === false) { $rootScope.$broadcast('closeSidebarMenu') }
        });

    }

})();
