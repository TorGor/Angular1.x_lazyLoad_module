/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('admin')
        .directive('selectPerson', selectPerson);

    selectPerson.$inject=['adminService'];
    /* @ngInject */
    function selectPerson(adminService) {
        return{
            restrict: 'EA',
            template:'<div class="">' +
            '    <input class="form-control" type="text" ng-disabled="inputStatu"  style="margin-bottom: 0px" ng-model="personPeople.other" ng-focus="personStatus=true"  ng-blur="personStatus=false">' +
            '    <div class="col-xs-12" style="position: absolute;left: 0;z-index: 4" ng-show="personStatus||personSelectStatus" ng-init="personStatus=false;personSelectStatus=false" ng-mouseover="personSelectStatus=true" ng-mouseleave="personSelectStatus=false">' +
            '        <select  class="form-control" multiple ng-model="tempSelectPerson" ng-click="selectPerson=tempSelectPerson[0];personSelectStatus=false"  ng-options="person as person.other for person in allPersons" ></select>' +
            '    </div>' +
            '</div>',
            replace:true,
            scope:{
                selectPerson:'=',
                inputStatu:'=',
                inputInit:'=',
                key:'@'
            },
            link:function($scope,$element,$attrs){
                $scope.inputStatu=$scope.inputStatu||false;
                $scope.personPeople = {};
                $scope.$watch('selectPerson',function(){
                    if($scope.selectPerson&&$scope.selectPerson.employee_id){
                        $scope.personPeople=angular.copy($scope.selectPerson)
                    }else{
                        $scope.personPeople={}
                    }
                })
                $scope.$watch('personPeople.other',function(){
                    if($scope.personPeople&&$scope.personPeople.other==''){
                        $scope.selectPerson={}
                    }
                })
                $scope.input_init = function () {
                    var filterName = $scope.allPersons.filter(function (item) {
                        return item.employee_id == $scope.inputInit
                    })
                    if (filterName.length > 0) {
                        $scope.selectPerson = filterName[0];
                        $scope.personPeople.other = filterName[0]['other']
                    } else {
                        $scope.personPeople.other = $scope.inputInit
                    }
                }
                $scope.$watch('inputInit',function(){
                    if ($scope.inputInit && $scope.allPersons) {
                        $scope.input_init()
                    }
                })
            }
        }
    }

})();
