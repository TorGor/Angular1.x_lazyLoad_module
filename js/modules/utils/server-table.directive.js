/**
 * Created by wlwang on 2017/2/23.
 */

//隐藏左侧导航
(function (angular) {
    'use strict';

    angular
        .module('app.utils')
        .directive('serverDataTable', serverDataTable)
        .directive('serverDataTableSort', serverDataTableSort);

    serverDataTable.$inject = ['$injector','$timeout'];

    /* @ngInject */
    function serverDataTable($injector,$timeout) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                aoData: '=aoData',
                items: '=items',
                url: '=url',
                serviceName: '@serviceName',
                serviceNameAttr: '@serviceNameAttr',
                reload: '=reload',
                handleData: '=',
            },
            template:
                '<div class="clearfix"></div>\
                <div ng-transclude></div>\
                <div class="table-bottom-notice">\
                    <span class="pull-left" style="margin-bottom: 15px">\
                        {{"table.common.per_page" | translate}}\
                        <select  class="form-control" style="display: inline;width: auto"  ng-model="pageNumber"  ng-options="pageNumber as pageNumber for pageNumber in [25,50,100]"></select>\
                    </span>\
                    <span class="pull-left">{{"table.common.showing_item_to" | translate:{from:(currentPage-1)*pageNumber+1||0,to:currentPage*pageNumber>=pageMessage.count?pageMessage.count:currentPage*pageNumber,totalItem:pageMessage.count||0 } }}</span>\
                    <span class="pull-right">\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage-1" ng-hide="currentPage<=1||items.length==0">\
                            <span class="glyphicon glyphicon-arrow-left" ></span>\
                        </button>\
                        <span ng-hide="items.length==0">{{"table.common.cur_page_first" | translate}}</span><input ng-hide="items.length==0" class="form-control" type="number"  ng-model="currentPage" style="display: inline;max-width: 150px!important;" ng-style="{width:currentPage.toString().length*6+55+\'px\'}"><span ng-hide="items.length==0">{{"table.common.cur_page_last" | translate}}</span>\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage+1" ng-hide="currentPage>=pageTotle||items.length==0">\
                            <span class="glyphicon glyphicon-arrow-right" ></span>\
                        </button>\
                        <span ng-if="items.length!==0">|{{"table.common.total_page" | translate:{totalPage:pageTotle} }}| </span>\
                        <span ng-if="items.length==0">|{{"table.common.total_page" | translate:{totalPage:1} }}| </span>\
                    </span>\
                </div>',
            controller: function ($scope, $element, $attrs, $transclude) {
                $scope.pageNumber = 25;
                $scope.currentPage = 1;
                $scope.TemDraw = 1;

                $scope.items = [];

                $scope.pageMessage = {};
                $scope.pageTotle = 0;

                if(!$scope.aoData){
                    $scope.aoData = {}
                    // throw new Error('没有填写输入搜索条件')
                }
                if(!$scope.serviceName||!$scope.serviceNameAttr){
                    // throw new Error('先注入服务名称和服务属性名称')
                }
                var service=$injector.get($scope.serviceName);

                $scope.pageNeedChange=false;
                $scope.$watch('[currentPage+pageNumber]',function(newValue,oldValue){
                    if (newValue!=oldValue)$scope.pageTotle=Math.ceil($scope.pageMessage.count/$scope.pageNumber)
                    if($scope.currentPage>=$scope.pageTotle)$scope.currentPage=$scope.pageTotle
                    if($scope.currentPage<=0)$scope.currentPage=1;
                    $scope.pageNeedChange=true;
                    $scope.aoData.page=$scope.currentPage;
                    $scope.aoData.pageSize=$scope.pageNumber;
                });

                var timeout = null;
                $scope.$watch('aoData',function(newVal,oldVal){
                    if (newVal!=oldVal) {
                        console.log(newVal)

                        if($scope.pageNeedChange||$scope.currentPage==1){

                        }else{
                            $scope.currentPage=1;
                            return
                        }
                        if (timeout) {
                            $timeout.cancel(timeout)
                        }
                        timeout = $timeout(function(){
                            $scope.ServerPaging();
                            $scope.pageNeedChange=false
                        }, 200);
                    }else{
                        timeout = $timeout(function(){
                            $scope.ServerPaging();
                            $scope.pageNeedChange=false
                        }, 0);
                    }
                },true);
                $scope.$watch('reload',function(newVal,oldVal){
                    if (newVal!=oldVal) {
                        if($scope.pageNeedChange||$scope.currentPage==1){

                        }else{
                            $scope.currentPage=1;
                            return
                        }
                        if (timeout) {
                            $timeout.cancel(timeout)
                        }
                        timeout = $timeout(function(){
                            $scope.ServerPaging()
                        }, 200);
                    }
                });
                $scope.ServerPaging=function(){
                    var temAoData=angular.copy($scope.aoData);
                    if($scope.url){
                        service[$scope.serviceNameAttr]($scope.url,temAoData,{}).then(function (data){
                            var result = data.data && data.data.data;
                            console.log(result, 'result')
                            if(result && result.data && result.meta){
                                $scope.pageMessage.count=angular.copy(result.meta.total);
                                $scope.pageTotle=angular.copy(result.meta.last_page);
                                if($scope.handleData){
                                    $scope.items=angular.copy($scope.handleData(result.data));
                                }else{
                                    $scope.items=angular.copy(result.data);
                                }
                            }else{
                                $scope.pageMessage.draw=angular.copy(data.data.draw||1);
                                $scope.pageMessage.count= 0;
                                $scope.pageTotle=1;
                                $scope.items=[];
                            }
                        });
                    }else{
                        service[$scope.serviceNameAttr](temAoData,{}).$promise.then(function (data){
                            console.log(data, '----ServerPaging')
                            if(data.data && data.data.draw && $scope.pageMessage.draw){
                                if(parseInt($scope.pageMessage.draw)<=parseInt(data.data.draw)){
                                    $scope.pageMessage.count=angular.copy(data.data.totalSize);
                                    $scope.pageTotle=angular.copy(data.data.totalPage);
                                    $scope.items=angular.copy(data.data.list);
                                }
                            }else{
                                $scope.pageMessage.draw=angular.copy(data.data.draw||1);
                                $scope.pageMessage.count=angular.copy(data.data.totalSize);
                                $scope.pageTotle=angular.copy(data.data.totalPage);
                                $scope.items=angular.copy(data.data.list);
                                console.log($scope.pageMessage,'$scope.pageMessage')
                            }
                        });
                    }
                }
            }
        }
    }

    serverDataTableSort.$inject = [];
    function serverDataTableSort(){
        return {
            restrict: 'AE',
            scope: {
                aoData: '=aoData',
                serverDataTableSort: '@serverDataTableSort',
            },
            controller: function ($scope,$element,$attrs) {
                angular.element($element).on('click',function(){
                    $scope.sortValue($scope.serverDataTableSort)
                }).append('<i style="position: absolute;top: 11px;right: 4px"></i>').css('position','relative');
                angular.element($element).find('i').css('display','block')
                $scope.sortValue=function(name){
                    if($scope.aoData.sort && $scope.aoData.sort.indexOf(name) !== -1){
                        if($scope.aoData.sort.indexOf('desc') !== -1){
                            $scope.aoData.sort = name + '.asc'
                        }else {
                            $scope.aoData.sort = name + '.desc'
                        }
                    }else{
                        $scope.aoData.sort = name + '.desc'
                    }
                    $scope.$parent.$apply();
                };
                $scope.$watch('aoData.sort',function(){
                    var className='';
                    if($scope.aoData.sort && $scope.aoData.sort.indexOf($scope.serverDataTableSort) !== -1){
                        if($scope.aoData.sort.indexOf('desc') !== -1){
                            className='glyphicon glyphicon-sort-by-attributes-alt pull-right'
                        }else{
                            className='glyphicon glyphicon-sort-by-attributes pull-right'
                        }
                    }else{
                        className='glyphicon glyphicon-sort pull-right'
                    }
                    angular.element($element).find('i').removeClass().addClass(className)
                })
            }
        }
    }

})(angular);
