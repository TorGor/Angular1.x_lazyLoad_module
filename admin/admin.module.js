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
			'admin.gameRecords',
			'admin.usersManage',
			'admin.walletsManage',
			'admin.bigwinsManage',
			'admin.domainsManage',
			'admin.affiliatesManage',
			'admin.affiliatesPlans',
			'admin.bankCards',
			'admin.mediaCategories',
			'admin.mediaFiles',
			'admin.admin',
			'admin.button',
			'admin.menu',
			'admin.role',
			//new module name will be append here

        ]);
})();