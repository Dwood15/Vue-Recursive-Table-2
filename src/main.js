// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import StaticData from './components/StaticData';
import DataMapper from './components/DataMapper';
import ClientTable from 'vue-tables-2';

Vue.use(ClientTable);
Vue.config.productionTip = false;

const staticData = new StaticData();

let products = staticData.getProducts();
let purchases = staticData.getPurchases();
console.log('Purchases: ', purchases);
console.log('Products! ', products);
// Actual usage as follows
let mapper = new DataMapper(products.rows, purchases, 'product_id', 'id');
products = mapper.map();

//mapper = new DataMapper(campaigns.rows, campaigns, 'product_group_id', 'id');

// product_groups.rows = mapper.map();
Vue.component('recursive-table', App);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	mounted: () => {},
	data: {
		mapped_data: purchases //{ meta: [], rows: [] }
	},
	template: '<recursive-table :data="mapped_data"/>'
});
