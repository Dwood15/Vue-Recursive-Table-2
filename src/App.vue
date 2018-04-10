<template>
  <div id="app">
    <v-client-table :data="rows" :columns="cols" :headers="heads"></v-client-table>
  </div>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import Vue from 'vue';

Vue.use(ClientTable);

export default {
	name: 'recursive-table',
	components: { ClientTable },
	props: ['data'],
	computed: {
		rows: function() {
			console.log('Data Table Row Data: ', this.data);
			return this.data.rows;
		},
		cols: function() {
			console.log('Meta data: ', this.data.meta);
			return Object.keys(this.data.meta);
		},
		heads: function() {
			return Object.values(this.data.meta);
		},
		options: function() {
			return {
				uniqueKey: 'id',
				saveState: true,
				filterable: true,
				perPage: 30,
				preserveState: true,
				// templates: this.tblTemplates,
				childRow: this.childComponent //<- this is where we're supposed to specify the childRow componenet.
				//Needs to be a function (h, row) {}, the string name of the component/imported component.
				//import { default as xyz } from 'xyz';
				//childRow: xyz
				//seems to work, as well as let xyz = require('xyz').
			};
		},
		childComponent: function() {
			if (typeof this.childData !== undefined) {
				return 'recursive-table';
			}

			return null;
		}
	}
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	text-align: center;
	// color: #2c3e50;
	margin-top: 60px;
}

.VueTables__child-row-toggler {
	width: 24px;
	height: 24px;
	line-height: 24px;
	display: block;
	margin: auto;
	text-align: center;
}

.VueTables__child-row-toggler--closed::before {
	content: '+';
}

.VueTables__child-row-toggler--open::before {
	content: '-';
}
</style>
