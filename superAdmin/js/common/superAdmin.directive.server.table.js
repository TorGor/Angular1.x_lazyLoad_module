/**
 * Created by wlwang on 2017/2/23.
 */

//隐藏左侧导航
(function (angular) {
    'use strict';

    angular
        .module('superAdmin')
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
                serviceName: '@serviceName',
                serviceNameAttr: '@serviceNameAttr',
                reload: '=reload',
            },
            template:
                '<div class="clearfix"></div>\
                <div ng-transclude></div>\
                <div class="table-bottom-notice">\
                    <span class="pull-left" style="margin-bottom: 15px">\
                        每页\
                        <select  class="form-control" style="display: inline;width: auto"  ng-model="pageNumber"  ng-options="pageNumber as pageNumber for pageNumber in [10,25,50,100]"></select>\
                        项结果,</span>\
                    <span class="pull-left" ng-show="items.length==0">共 {{pageMessage.count||0}} 项</span>\
                    <span class="pull-left" ng-hide="items.length==0">显示第 {{(currentPage-1)*pageNumber+1||0}} 至 {{currentPage*pageNumber>=pageMessage.count?pageMessage.count:currentPage*pageNumber}} 项结果，共 {{pageMessage.count||0}} 项</span><span class="" ng-show="false">（由{{pageMessage.total}}项滤出）</span>\
                    <span class="pull-right">\
                        <button type="button" class="btn btn-default" ng-click="currentPage=currentPage-1" ng-hide="currentPage<=1||items.length==0">\
                        <span class="glyphicon glyphicon-arrow-left" ></span>\
                        </button>\
                        <span ng-hide="items.length==0">第</span><input ng-hide="items.length==0" class="form-control" type="number"  ng-model="currentPage" style="display: inline;max-width: 150px!important;" ng-style="{width:currentPage.toString().length*6+55+\'px\'}"><span ng-hide="items.length==0">页</span>\
                        <button type="button" class="btn btn-default" ng-click="currentPage=currentPage+1" ng-hide="currentPage>=pageTotle||items.length==0">\
                        <span class="glyphicon glyphicon-arrow-right" ></span>\
                        </button>\
                        <span ng-if="items.length!==0">|共<span ng-bind="pageTotle"></span>页| </span>\
                        <span ng-if="items.length==0">|共1页| </span>\
                    </span>\
                </div>',
            controller: function ($scope, $element, $attrs, $transclude) {
                $scope.pageNumber = 10;
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
                    $scope.aoData.curPage=$scope.currentPage;
                    $scope.aoData.pageSize=$scope.pageNumber;
                });

                var timeout = null;
                $scope.$watch('aoData',function(newVal,oldVal){
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
                    temAoData.draw=$scope.TemDraw;
                    $scope.TemDraw++;
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
                    $scope.sortValue($scope.cyDataTableSort)
                }).append('<i style="position: absolute;top: 11px;right: 4px"></i>').css('position','relative');
                angular.element($element).find('i').css('display','block')
                $scope.sortValue=function(name){
                    if($scope.aoData.sort_col==name){
                        if($scope.aoData.sort_dir==true){
                            $scope.aoData.sort_dir=false
                        }else {
                            $scope.aoData.sort_dir=true
                        }
                    }else{
                        $scope.aoData.sort_dir=true
                    }
                    $scope.aoData.sort_col=name;
                    $scope.$parent.$apply();
                };
                $scope.$watch('aoData.sort_dir+aoData.sort_col',function(){
                    var className=''
                    if($scope.aoData.sort_col==$scope.cyDataTableSort){
                        if($scope.aoData.sort_dir){
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
