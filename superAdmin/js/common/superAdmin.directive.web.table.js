/**
 * Created by wlwang on 2017/2/23.
 */

//隐藏左侧导航
(function (angular) {
    'use strict';

    angular
        .module('superAdmin')
        .directive('webDataTable', webDataTable)
        .directive('webDataTableSort', webDataTableSort);

    webDataTable.$inject = ['$timeout', '$filter'];

    /* @ngInject */
    function webDataTable($timeout, $filter) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                aoData: '=aoData',
                items: '=items',
                showItems: '=showItems',
                reload: '=reload',
            },
            template:
                '<div class="">\
                </div>\
                <div class="clearfix"></div>\
                <div ng-transclude></div>\
                <div class="table-bottom-notice">\
                    <span class="pull-left" style="margin-bottom: 15px">\
                    每页\
                    <select  class="form-control" style="display: inline;width: auto"   ng-model="pageNumber"  ng-options="pageNumber as pageNumber for pageNumber in [10,25,50,100]"></select>\
                    项结果,\
                    </span>\
                    <span class="pull-left" ng-show="items.length==0">共 {{filterItems.length||0}} 项</span>\
                    <span class="pull-left" \
                        ng-hide="items.length==0">\
                        显示第 {{(currentPage-1)*pageNumber+1||0}} 至 {{currentPage*pageNumber>=filterItems.length?filterItems.length:currentPage*pageNumber}} 项结果，共 {{filterItems.length||0}} 项</span><span class="" ng-show="filterItems.length!=items.length">（由{{items.length}}项滤出）</span>\
                    <span class="pull-right">\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage-1" ng-hide="currentPage<=1||items.length==0">\
                        <span class="fa fa-chevron-left" ></span>\
                        </button>\
                        <span ng-hide="items.length==0">第</span><input ng-hide="items.length==0" class="form-control" type="number"  ng-model="currentPage" style="display: inline;max-width: 150px!important;" ng-style="{width:currentPage.toString().length*6+55+\'px\'}"><span ng-hide="items.length==0">页</span>\
                        <button style="position: relative;top: -2px" type="button" class="btn btn-default" ng-click="currentPage=currentPage+1" ng-hide="currentPage>=pageTotle||items.length==0">\
                        <span class="fa fa-chevron-right" ></span>\
                        </button>\
                        <span ng-if="items.length!==0">|共<span ng-bind="pageTotle"></span>页| </span>\
                        <span ng-if="items.length==0">|共1页| </span>\
                    </span>\
                </div>',
            controller: function ($scope, $element, $attrs, $transclude) {
                $scope.pageNumber=10;
                $scope.currentPage=1;

                if(!$scope.aoData){
                    $scope.aoData={}
                    // throw new Error('没有填写输入搜索条件')
                }

                $scope.pageNeedChange=false;
                $scope.$watch('[currentPage+pageNumber+showItems.length]',function(newValue,oldValue){
                    if (newValue!=oldValue){
                        $scope.pageTotle=Math.ceil($scope.filterItems.length/$scope.pageNumber);
                    }
                    if($scope.currentPage>=$scope.pageTotle)$scope.currentPage=$scope.pageTotle;
                    if($scope.currentPage<=0)$scope.currentPage=1;
                    $scope.pageNeedChange=true;
                    $scope.ServerPaging();
                });

                var timeout = null;
                $scope.$watch('aoData',function(newVal,oldVal){
                    if (newVal!=oldVal) {
                        console.log($scope.aoData, '$scope.aoData')
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
                $scope.$watch('[reload + items.length]',function(newVal,oldVal){
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
                    var sortCol = '';
                    if(temAoData.sort_col !== undefined){
                        sortCol = temAoData.sort_col;
                        delete temAoData.sort_col;
                    }
                    if(temAoData.sort_dir !== undefined){
                        if(temAoData.sort_dir){
                            sortCol = '-' + sortCol;
                        }
                        delete temAoData.sort_dir;
                    }
                    var tempFilterData = $filter('filter')(angular.copy($scope.items),temAoData);
                    $scope.filterItems = $filter('orderBy')(tempFilterData,sortCol);
                    $scope.showItems = $filter('limitTo')($scope.filterItems, $scope.pageNumber, ($scope.currentPage-1)*$scope.pageNumber);
                }
            }
        }
    }

    webDataTableSort.$inject = [];
    function webDataTableSort(){
        return {
            restrict: 'AE',
            scope: {
                aoData: '=aoData',
                webDataTableSort: '@webDataTableSort',
            },
            controller: function ($scope,$element,$attrs) {
                angular.element($element).on('click',function(){
                    $scope.sortValue($scope.webDataTableSort)
                }).append('<i style="position: absolute;top: 12px;right: 4px"></i>').css('position','relative');

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
                    if($scope.aoData.sort_col==$scope.webDataTableSort){
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
