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
        // var client = new Pusher('78546555ea941f0a68b8');
        var client = new Pusher('34cab385c00810dc35d2', {
            cluster: 'ap2',
            encrypted: true
        });
        var pusher = $pusher(client);
        var aoboTech = pusher.subscribe('aobo-tech');
        aoboTech.bind('summary.success[failed]',
            function(data) {
                console.log(data)
            }
        );
        aoboTech.bind('summary.success[failed]',
            function(data) {
                console.log(data)
            }
        );
        aoboTech.bind('log.failed',
            function(data) {
                console.log(data)
            }
        );
        aoboTech.bind('media.upload.success',
            function(data) {
                console.log(data)
            }
        );
        aoboTech.bind('media.upload.failed',
            function(data) {
                console.log(data)
            }
        );
        aoboTech.bind('media.delete.success',
            function(data) {
                console.log(data)
            }
        );
        aoboTech.bind('media.delete.failed',
            function(data) {
                console.log(data)
            }
        );

        $rootScope.socketMessages = [
            {
                title:'dsdas',
                content:'内容'
            }
        ];

        $timeout(function () {
            // $rootScope.toasterInfo('info test')
        },3000);

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