(function() {

    angular
        .module('admin')
        .run(appRun);

    appRun.$inject = [
        '$pusher',
        '$rootScope',
        '$timeout',
        'adminService',
        '$translate'
    ];

    function appRun(
        $pusher,
        $rootScope,
        $timeout,
        adminService,
        $translate
    ) {
        // var client = new Pusher('78546555ea941f0a68b8');
        var client = new Pusher('34cab385c00810dc35d2', {
            cluster: 'ap2',
            encrypted: true
        });
        var pusher = $pusher(client);


        var aoboTech = pusher.subscribe('aobo-tech');
        ['summary.success','summary.failed','log.failed','media.upload.success','media.upload.failed','media.delete.success','media.delete.failed'].forEach(function (Event) {
            aoboTech.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-tech',
                        pusherEvent:Event,
                        pusherTitle:data.name||'',
                        pusherMsg:(data.param||data.error||'').toString(),
                    }));
                }
            );
        });

        function aoboWithdrawContent(data) {
            var tempStr = '';
            if(typeof data == 'object'){
                var tempObj = angular.copy(data);
                if(tempObj.id){
                   delete tempObj.id
                }
                window.Object.keys(tempObj).map(function (item) {
                    tempStr = tempStr + item + ':' + tempObj[item].toString()+','
                });
                return tempStr;
            }else if(typeof data == 'string'){
                return data;
            }
            return '';
        }

        var aoboWithdraw = pusher.subscribe('aobo-withdraw');
        ['withdraw.created','withdraw.declined','withdraw.approved','withdraw.paid'].forEach(function (Event) {
            aoboWithdraw.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-withdraw',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        var aoboCoupon = pusher.subscribe('aobo-coupon');
        ['coupon.applied','coupon.failed'].forEach(function (Event) {
            aoboCoupon.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-coupon',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        var aoboDeposit = pusher.subscribe('aobo-deposit');
        ['deposit.failed'].forEach(function (Event) {
            aoboDeposit.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-deposit',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        var aoboBigwin = pusher.subscribe('aobo-bigwin');
        ['bigwin.created','bigwin.failed'].forEach(function (Event) {
            aoboBigwin.bind(Event,function(data) {
                    $rootScope.socketMessages.push(window.Object.assign(data,{
                        pusherType:'aobo-bigwin',
                        pusherEvent:Event,
                        pusherTitle:Event||'',
                        pusherMsg:aoboWithdrawContent(data),
                    }));
                }
            );
        });

        $rootScope.socketMessages = [
            {
                pusherType:'aobo-tech',
                pusherEvent:'summary.success',
                pusherTitle:'标题',
                pusherMsg:'summary.success',
            }
        ];

        $rootScope.socketMessagesHandelClick = function(item,index){
            var tempData = {
                "userId": window.userInfo.adminId || "",
                "username": window.userInfo.username || "",
                "pusherMsg":item.pusherMsg||"",
                "pusherType":item.pusherType||"",
                "pusherEvent":item.pusherEvent||""
            };
            adminService.postReq('/admin/savePusher', {}, tempData).then(function (res) {
                if (typeof res.data.success === 'boolean') {
                    if (res.data.success) {
                        $rootScope.socketMessages.splice(index,1);
                        $rootScope.toasterSuccess(res.data.msg);
                    } else {
                        $rootScope.alertErrorMsg(res.data.msg);
                        return '';
                    }
                }
            });
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

        $rootScope.superAdminSelect012 = {
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