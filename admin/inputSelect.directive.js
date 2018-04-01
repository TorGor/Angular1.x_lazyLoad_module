/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('admin')
        .directive('inputSelect', inputSelect);

    inputSelect.$inject=['adminService'];
    /* @ngInject */
    function inputSelect(adminService) {
        return{
            restrict: 'EA',
            template:'<div class="">' +
            '    <input class="form-control" type="text"  style="margin-bottom: 0px" ng-model="personPeople.other" ng-focus="personStatus=true;searchDataFromServer()"  ng-blur="personStatus=false">' +
            '    <div class="col-xs-12" style="position: absolute;left: 0;z-index: 1" ng-show="personStatus||selectSelectStatus" ng-mouseover="selectSelectStatus=true" ng-mouseleave="selectSelectStatus=false">' +
            '        <select  class="form-control" multiple ng-model="tempSelectItem" ng-click="selectSelectStatus=false;handelClick()"  ng-options="select as select.other for select in allItems" ></select>' +
            '    </div>' +
            '</div>',
            replace:true,
            scope:{
                //inputValue:'=',
                className:'@'
            },
            link:function($scope,$element,$attrs){
                var timer = null;
                $scope.personStatus = false;
                $scope.selectSelectStatus = false;
                $scope.tempSelectItem = [];

                if(!$scope.className){
                    $scope.className = ''
                }

                $scope.inputStatu=$scope.inputStatu||false;
                $scope.searchDataFromServer = function () {
                    var temAoData = {};
                    adminService.getReq('/rest/getUsers',temAoData,{}).then(function (data){
                        var result = data.data && data.data.data;
                        console.log(result, 'result')
                        if(result && result.data && result.meta){
                            $scope.allItems=angular.copy(result.data);
                            $scope.allItems.forEach(function(item) {
                                item['other'] = item['username']
                            })
                        }else{
                            $scope.allItems=[];
                        }
                    });
                };
                $scope.handelClick = function() {
                    console.log($scope.tempSelectItem,'111111')
                };
                $scope.$watch('inputValue', function (newValue, oldValue) {
                    if (newValue != oldValue && ($scope.personStatus||$scope.selectSelectStatus)) {
                        if (timer) {
                            $timeout.cancel(timer);
                        }
                        timer = $timeout(function() {
                            $scope.searchDataFromServer($scope.inputValue);
                        }, 300);
                    }
                });
            }
        }
    }

})();
