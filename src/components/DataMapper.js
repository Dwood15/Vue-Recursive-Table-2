//ORM in JS
import _ from 'lodash';
export default class DataMapper {
	/**
	 * @param {Array<Object>} core - What we're using to map from
	 * @param {Array<Object>} mappings - What we're using to map to.
	 * @param {String} mapKey - The 'primary' key of the mapping array's objects.
	 * @param {String} coreKey - The 'foreign' key of the core array's object - refers to an object in mappings.
	 */
	constructor(core, mappings, mapKey, coreKey) {
		this.core = core;

		this.mapKey = mapKey;
		this.coreKey = coreKey;

		if (_.has(mappings, 'meta')) {
			//debugger;
			this.mapMeta = mappings.meta;
			this.mappings = mappings.rows;
		} else {
			this.mappings = mappings;
		}
	}

	/**
	 * Loop through all entries, mapping the mappings
	 * entries into core.
	 */
	map() {
		// First step is we need to map the mappings by
		// their appropriate key
		const mappingsMap = new Map();
		let mapping = null;

		for (let x = 0; x < this.mappings.length; x++) {
			mapping = this.mappings[x];

			if (mappingsMap.has(mapping[this.mapKey])) {
				console.log('Mapping: ', this.mappings);
				console.log('Core: ', this.core);
				if (typeof mapping[this.mapKey] !== 'undefined')
					console.warn(`Duplicate data for key: ${mapping[this.mapKey]}`);
				else throw new `Duplicate data for key: ${mapping[this.mapKey]}`();
			}

			mappingsMap.set(mapping[this.mapKey], mapping);
		}
		// next we need to loop through the core and map
		// everything
		let coreObj = null;
		for (let x = 0; x < this.core.length; x++) {
			coreObj = this.core[x];

			const val = coreObj[this.coreKey];

			if (mappingsMap.has(val)) {
				if (this.coreKey === 'id') {
					if (!_.has(coreObj, 'childData')) {
						coreObj['childData'] = { meta: this.mapMeta, rows: [] };
					}

					coreObj.childData.rows.push(mappingsMap.get(val));
				} else {
					coreObj[this.coreKey] = mappingsMap.get(val);
				}
			} else {
				coreObj[this.coreKey] = null;
			}
		}

		return this.core;
	}
}
