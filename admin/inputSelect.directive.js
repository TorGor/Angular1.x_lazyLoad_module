/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('admin')
        .directive('inputSelect', inputSelect);

    inputSelect.$inject=['adminService','$timeout'];
    /* @ngInject */
    function inputSelect(adminService,$timeout) {
        return{
            restrict: 'EA',
            template:
            '<div>'+
            '<ui-select\n' +
            '                                ng-model="searchValue"\n' +
            '                                on-select="handelSelect($item, $model)"\n' +
            '                                theme="bootstrap"\n' +
            '                            >\n' +
            '                                <ui-select-match placeholder="{{inputPlaceholder}}">\n' +
            '                                    <span ng-bind="$select.selected._label"></span>\n' +
            '                                </ui-select-match>\n' +
            '                                <ui-select-choices repeat="item._label as item in allItems | filter: {\'_label\':$select.search}">\n' +
            '                                    <span ng-bind="item._label"></span>\n' +
            '                                </ui-select-choices>\n' +
            '                            </ui-select></div>',
            replace:true,
            scope:{
                inputPlaceholder:'@',
                inputkey:'@',
                outputkey:'@',
                searchkey:'@',
                url:'@',
                minLength:'@',
                outputValue:'='
            },
            link:function($scope,$element,$attrs){
                var timer = null;

                $scope.allItems = [];

                if(!$scope.outputValue){
                    $scope.outputValue = ''
                }

                if(!$scope.outputkey){
                    $scope.outputkey = ''
                }
                if(!$scope.searchkey){
                    $scope.searchkey = $scope.outputValue
                }
                if(!$scope.inputPlaceholder){
                    $scope.inputPlaceholder = 'search value'
                }

                $scope.inputStatu=$scope.inputStatu||false;
                $scope.searchDataFromServer = function (value) {
                    var temAoData = {};
                    if($scope.searchkey){
                        temAoData[$scope.searchkey] = value||'';
                    }
                    adminService.getReq($scope.url,temAoData,{}).then(function (data){
                        var result = data.data && data.data.data;
                        if(result && result.data && result.meta){
                            if(window.Array.isArray(result.data)){
                                $scope.allItems = [];
                                result.data.forEach(function(dataItem) {
                                    var tempObj={};
                                    tempObj['_label']=dataItem[$scope.inputkey]||'';
                                    tempObj['_value']=dataItem[$scope.outputkey]||'';
                                    $scope.allItems.push(tempObj)
                                })
                            }
                        }else{
                            $scope.allItems=[];
                        }
                    });
                };
                $scope.handelSelect = function($item, $model) {
                    $scope.outputValue = $item['_value']||'';
                    $($element).find('.ui-select-search').val($model)
                };

                $timeout(function() {
                    $($element).find('.ui-select-search').bind('keyup', function(e) {
                        var tempvalue = e.target.value;
                        if(!tempvalue){
                            $scope.outputValue = '';
                           return;
                        }
                        if($scope.minLength){
                            if(tempvalue.length<parseInt($scope.minLength)){
                                return;
                            }
                        }
                        if (timer) {
                            $timeout.cancel(timer);
                        }
                        timer = $timeout(function() {
                            $scope.searchDataFromServer(tempvalue);
                        }, 300);
                    })
                    $($element).find('.ui-select-search').bind('focus',function(e) {
                        var tempvalue = e.target.value;
                        $scope.searchDataFromServer(tempvalue);
                    })
                },10)
            }
        }
    }

})();
