(function() {

    angular
        .module('admin.promotionsManage')
        .controller('promotionsEditContentModalController', promotionsEditContentModalController);

    promotionsEditContentModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        '$translate',
        'modalItem'
    ];

    function promotionsEditContentModalController(
        $scope,
        $rootScope,
        $uibModalInstance,
        $translate,
        modalItem
    ) {
        $scope.type = modalItem._type
        if(modalItem._type){
            delete modalItem._type
        }

        $scope.options = {
            height: 400,
            focus: true,
            airMode: !$scope.hasPower||$scope.edit==1,
            toolbar: [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link','picture','video','hr']],
                ['view', ['codeview']],
                ['help', ['help']]
            ]
        };

        // 初始化table数据
        $scope.initModalItemModalData = function () {
            $scope.modalItem = angular.copy(modalItem);
            if(!$scope.modalItem.locale){
                $scope.modalItem.locale = $scope.localesOptions[0].value
            }
        };

        $scope.confirmModalRebatesBrand = function () {
            $uibModalInstance.close({
                type:$scope.type,
                data:$scope.modalItem
            });
        };

        $scope.cancelModalRebatesBrand = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // 页面加载执行的函数

        $scope.initModalItemModalData();
    }
})();
