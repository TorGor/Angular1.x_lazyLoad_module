(function() {

    angular
        .module('admin', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
			'admin.localeLanguage',
			'admin.countriesManage',
			'admin.userLevel',
			'admin.transactionsDetail',
			'admin.currenciesManage',
			'admin.blackLists',
			'admin.ordersManage',
			'admin.paymentMethods',
			'admin.appliesUse',
			'admin.gameBrands',
			'admin.gameCategories',
			'admin.couponsManage',
			'admin.gamesManage',
			'admin.gamesProducts',
			'admin.pspsManage',
			'admin.withdrawsManage',
			'admin.promotionsManage',
			'admin.rebatesList',
			'admin.reliefsList',
			'admin.transfersList',
			//new module name will be append here

        ]);
})();