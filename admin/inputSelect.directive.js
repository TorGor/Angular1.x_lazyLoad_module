/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('admin')
        .directive('inputSelect', inputSelect);

    inputSelect.$inject=['$rootScope','adminService','$timeout'];
    /* @ngInject */
    function inputSelect($rootScope, adminService, $timeout) {
        return{
            restrict: 'EA',
            template:
            '<div>'+
            '<ui-select\n' +
            '                                ng-model="searchValue.select"\n' +
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
                initPlaceholder:'@',
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

                $scope.searchValue = {};

                $scope.inputStatu=$scope.inputStatu||false;
                $scope.searchDataFromServer = function (value) {
                    var temAoData = {
                        page: 1,
                        pageSize: 25
                    };
                    if($scope.searchkey && typeof value !== 'object'){
                        temAoData[$scope.searchkey] = value||'';
                    }else{
                        window.Object.assign(temAoData,value)
                    }
                    adminService.getReq($scope.url,temAoData,{},{_loading:false}).then(function (data){
                        var result = data.data && data.data.data;
                        if(result && result.data && result.meta){
                            if(window.Array.isArray(result.data)){
                                $scope.allItems = [];
                                result.data.forEach(function(dataItem) {
                                    var tempObj={};
                                    if(window.Array.isArray(dataItem[$scope.inputkey])){
                                        tempObj['_label'] = $rootScope.showArrayName(dataItem[$scope.inputkey])
                                    }else{
                                        tempObj['_label']=dataItem[$scope.inputkey]||'';
                                    }
                                    tempObj['_value']=dataItem[$scope.outputkey]||'';
                                    $scope.allItems.push(tempObj)
                                    if($scope.initPlaceholder&&$scope.allItems[0]){
                                        $scope.searchValue.select = $scope.allItems[0];
                                        $($element).find('.ui-select-search').val($scope.searchValue.select['_label']);
                                        $scope.initPlaceholder = false;
                                    }
                                })
                            }
                        }else{
                            $scope.allItems=[];
                        }
                    });
                };
                $scope.handelSelect = function($item, $model) {
                    $scope.initPlaceholder = false;
                    $scope.outputValue = $item['_value']||'';
                    $($element).find('.ui-select-search').val($model)
                };

                function camelCaseKeysToUnderscore(obj) {

                    var newName;

                    if (typeof(obj) != 'object') return obj;

                    for (var oldName in obj) {

                        // Camel to underscore
                        newName = oldName.replace(/([a-z0-9][A-Z])/g, function ($1) {
                            return $1.toLowerCase().substr(0, 1) + '_' + $1.toLowerCase().substr(1);
                        });

                        // Only process if names are different
                        if (newName != oldName) {
                            // Check for the old property name to avoid a ReferenceError in strict mode.
                            if (obj.hasOwnProperty(oldName)) {
                                obj[newName] = obj[oldName];
                                delete obj[oldName];
                            }
                        }

                        // Recursion
                        if (typeof(obj[newName]) == 'object') {
                            obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
                        }

                    }
                    return obj;
                }

                if($scope.initPlaceholder){
                    if($scope.outputkey){
                        $scope.searchDataFromServer(camelCaseKeysToUnderscore({
                            [$scope.outputkey]:$scope.initPlaceholder
                        }))
                    }
                }

                $scope.$watch('outputValue',function(newValue, oldValue) {
                    if(newValue!==oldValue){
                        if(!newValue){
                            $($element).find('.ui-select-search').val('');
                            $scope.searchValue.select = undefined;
                        }
                    }
                });

                $timeout(function() {
                    $($element).find('.ui-select-search').bind('keyup', function(e) {
                        var tempvalue = e.target.value;
                        if(!tempvalue){
                            $scope.outputValue = '';
                            console.log($scope.outputValue)
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
                    });
                    $($element).find('.ui-select-search').bind('focus',function(e) {
                        var tempvalue = e.target.value;
                        $scope.searchDataFromServer(tempvalue);
                    })
                },10)
            }
        }
    }

})();
