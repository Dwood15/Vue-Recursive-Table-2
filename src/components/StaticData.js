import _ from 'lodash';

//In order of inheritance
const defaultDescriptors = {
	group: ['id', 'name'],
	campaign: ['id', 'name', 'parent_id', 'group_id'],
	product: ['id', 'name', 'campaign_id'],
	purchase: ['id', 'product_id']
};

const metaList = {
	id: 'Id',
	name: 'Name',
	group_id: 'Campaign Group',
	campaign_id: 'Campaign',
	purchase_id: 'Purchase',
	product_id: 'Product'
};

const grpMeta = {
	id: metaList.id,
	name: metaList.name
};

const campMeta = {
	id: metaList.id,
	name: metaList.name,
	group_id: metaList.group_id
};

const prodMeta = {
	id: metaList.id,
	name: metaList.name,
	campaign_id: metaList.campaign_id
};

const purchMeta = {
	id: metaList.id,
	name: metaList.name,
	product_id: metaList.product_id
};

const inheritanceSchema = {
	campaign: {
		parent_id: { campaign: 'id' }, //maps to another campaign's id property.
		group_id: { group: 'id' } //Must not be null
	},

	product: {
		campaign_id: { campaign: 'id' }
	},

	purchase: {
		product_id: { product: 'id' }
	}
};

function addKvPairs(base, kvpList) {}
/**
 * @param id {number}
 * @param name {string}
 * @param extra Array{[]} - Array of tuples describing the relationship.
 */
function baseGen(inId, inName, extra = null) {
	let base = { id: inId, name: inName };

	//Add to base object the extra key value pairs.
	if (!_.isEmpty(extra)) {
		let fromPairs = _.map(extra, row => {
			return row;
		});

		console.log('fromPairs', fromPairs, extra);
		base = _.merge(base, fromPairs);
	}

	return base;
}

function genWithForeign(typeToGen, id, name, fKey = null) {
	if (_.has(inheritanceSchema, typeToGen)) {
		const foreign_cols = _.keys(inheritanceSchema[typeToGen]);

		return baseGen(id, name);
	}
}

const metaRows = function(inMeta, inRows) {
	return {
		meta: inMeta,
		rows: inRows
	};
};

//TODO: Pull out names into a group of arrays.
// const grpNameList = [];

const genGroups = () => {
	let grp_a = baseGen(0, 'Snail Mail');
	let grp_b = baseGen(1, 'E-Mail');
	let grp_c = baseGen(2, 'Voice-Mail');

	return {
		meta: grpMeta,
		rows: [grp_a, grp_b, grp_c]
	};
};

const genCamps = () => {
	let camp_a = genWithForeign('campaign', 0, 'Door 2 Door');
	let camp_b = genWithForeign('campaign', 1, 'Floor 2 Floor');
	let camp_c = genWithForeign('campaign', 2, 'Wall 2 Wall');

	return {
		meta: campMeta,
		rows: [camp_a, camp_b, camp_c]
	};
};

const genProds = () => {
	let prod_a = genWithForeign('product', 0, 'Boot');
	let prod_b = genWithForeign('product', 1, 'Scoot');
	let prod_c = genWithForeign('product', 2, 'Boogey');

	return {
		meta: purchMeta,
		rows: [prod_a, prod_b, prod_c]
	};
};

const genPrchs = () => {
	let prch_a = genWithForeign('purchase', 0, 'Boot');
	let prch_b = genWithForeign('purchase', 1, 'Scoot');
	let prch_c = genWithForeign('purchase', 2, 'Boogey');

	let prch_d = genWithForeign('purchase', 3, 'Boot');
	let prch_e = genWithForeign('purchase', 4, 'Scoot');
	let prch_f = genWithForeign('purchase', 5, 'Boogey');
	prch_a.product_id = 2;
	prch_b.product_id = 1;
	prch_c.product_id = 0;
	prch_d.product_id = 2;
	prch_e.product_id = 1;
	prch_f.product_id = 0;

	return {
		meta: purchMeta,
		rows: [prch_a, prch_b, prch_c, prch_d, prch_e, prch_f]
	};
};

export default class StaticData {
	constructor() {
		this.groups = genGroups();
		this.campaigns = genCamps();
		this.products = genProds();
		this.purchases = genPrchs();
	}

	getGroups() {
		return this.groups;
	}

	getCampaigns() {
		return this.campaigns;
	}

	getPurchases() {
		return this.purchases;
	}

	getProducts() {
		return this.products;
	}
}
