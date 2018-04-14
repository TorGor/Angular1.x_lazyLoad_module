(function() {

    angular
        .module('admin')
        .run(appRun);

    appRun.$inject = [
        '$pusher',
        '$rootScope',
        '$timeout',
        '$translate'
    ];

    function appRun(
        $pusher,
        $rootScope,
        $timeout,
        $translate
    ) {

        var client = new Pusher('aobo-tech');
        var pusher = $pusher(client);

        $timeout(function () {
            $rootScope.toasterInfo('info test')
        },3000)

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