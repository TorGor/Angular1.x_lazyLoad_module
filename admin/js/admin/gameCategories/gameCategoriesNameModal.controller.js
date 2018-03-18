(function() {

    angular
        .module('admin.gameCategories')
        .controller('GameCategoriesNameModalController', GameCategoriesNameModalController);

    GameCategoriesNameModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'adminService',
        'GameCategoriesNameItem'
    ];

    function GameCategoriesNameModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        adminService,
        GameCategoriesNameItem
    ) {

        // 原始的数据
        $scope.gameCategoriesNameModal = [];

        // 过滤出来的数据
        $scope.showGameCategoriesNameModal = [];
        $scope.gameCategoriesNameModalReload = 1;
        $scope.gameCategoriesNameModalAoData = {};
        $scope.gameCategoriesNameModalSearch = '';

        var baseGameCategoriesName = angular.copy(GameCategoriesNameItem);

        // 初始化table数据
        $scope.initGameCategoriesNameModalData = function () {
            $scope.gameCategoriesNameModal = [];
            console.log(GameCategoriesNameItem,'GameCategoriesNameItem')
            if(GameCategoriesNameItem['name'].length){
                $scope.gameCategoriesNameModal = GameCategoriesNameItem['name'];
                $scope.gameCategoriesNameModal.forEach(function (gameCategoriesNameItem, gameCategoriesNameIndex) {
                    gameCategoriesNameItem.id = gameCategoriesNameIndex + 1;
                })
            }
        };


        // 保存
        /**
         *
         * @param gameCategoriesNameModal 渠道名称数据对象
         * @param data
         */

        $scope.saveGameCategoriesNameModal = function (gameCategoriesNameModal, data) {
            $scope.gameCategoriesNameModal.forEach(function (gameCategoriesNameModalItem) {
                if(gameCategoriesNameModalItem.id == gameCategoriesNameModal.id){
                    window.Object.assign(gameCategoriesNameModalItem, data);
                    if($scope.validIsNew(gameCategoriesNameModalItem.id)){
                        gameCategoriesNameModalItem.id = window.parseInt(gameCategoriesNameModalItem.id, 10)
                    }
                }
            });
        };

        // 删除rebatesModal
        /**
         * @param gameCategoriesNameModal 渠道名称数据对象
         * @param index 位置
         * @return null
         */
        $scope.deleteGameCategoriesNameModal = function (gameCategoriesNameModal, index) {
            $scope.gameCategoriesNameModal.splice(index, 1)
        };

        // 添加按钮
        $scope.addGameCategoriesNameModal = function () {
            $scope.gameCategoriesNameModalAoData = {};
            $scope.gameCategoriesNameModalSearch = '';
            $scope.gameCategoriesNameModal.unshift({
                'id': ($scope.gameCategoriesNameModal.length+1) + 'null',
                "locale": $scope.localesOptions[0] ? $scope.localesOptions[0].value : '',
                "value": ''
            });
        };

        /**
         *
         * @param GameCategoriesNameItem 添加的渠道名称
         * @param index 添加的index
         */

        $scope.cancelSaveModal = function (GameCategoriesNameItem, index) {
            if ($scope.validIsNew(GameCategoriesNameItem.id)) {
                $scope.gameCategoriesNameModal.splice(index, 1);
            }
        };

        $scope.confirmModal = function () {
            $scope.gameCategoriesNameModal = $scope.gameCategoriesNameModal.filter(function (gameCategoriesNameItem) {
                return !$scope.validIsNew(gameCategoriesNameItem.id);
            });
            $scope.gameCategoriesNameModal.forEach(function (gameCategoriesNameItem, gameCategoriesNameIndex) {
                if(gameCategoriesNameItem.id){
                    delete gameCategoriesNameItem.id;
                }
            });
            if($scope.gameCategoriesNameModal && $scope.gameCategoriesNameModal.length){
                var tempObj = {};
                var sameKey = false;
                $scope.gameCategoriesNameModal.map(function(nameItem) {
                    if(tempObj[nameItem.locale]){
                        sameKey = true
                    }
                    tempObj[nameItem.locale] = nameItem.value
                });
                if(sameKey){
                    $rootScope.alertErrorMsg('you set same local,just remove one');
                    return '';
                }
            }
            baseGameCategoriesName.name = $scope.gameCategoriesNameModal;
            $uibModalInstance.close({
                type:'name',
                data:baseGameCategoriesName
            });
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss({
                type:'name',
                data:baseGameCategoriesName
            });
        };

        // 页面加载执行的函数

        $scope.initGameCategoriesNameModalData();

    }
})();
