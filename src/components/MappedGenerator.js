import Faker from './Faker';
import _ from 'lodash';

// let groups = metaRows();
// let campaigns = metaRows();
// let purchases = metaRows();

//TODO: Use actual json schemas. See: http://json-schema.org/
const faker = new Faker();

const genInfo = {
	id: {
		value_type: 'number',
		min: 0,
		max: 999,
		unique: true,
		generator: () => {
			return faker.randInt(this.min, this.max);
		}
	},
	name: {
		value_type: 'string', //Human-readable
		unique: false,
		generator: () => {
			return faker.randString(2);
		}
	}
	//TODO: ADD relational information.
};
export default class DataGenerator {
	/**
	 * @param integer defaultLength - Sets default number items to gen whenever a gen is called.
	 */
	constructor(defaultNumObjects = 2) {
		this.num_objects_to_gen = defaultNumObjects;
		this.genInfo = genInfo;
		this.Faker = new Faker();
	}

	setObjectDescriptors(descriptors = defaultDescriptors) {
		this.descriptors = descriptors;
	}

	/**
	 * @returns [{}]
	 */
	getObjectDescriptor(key) {
		/*eslint max-len: ["error", { "code": 160 }]*/
		if (typeof key === 'string' && typeof this.descriptors[key] !== 'undefined') {
			return this.descriptors[key];
		}
		return [];
	}

	/**
	 * getBasicDataList -
	 * @param modelName the name of the model you would like to generate. See defaultDescriptors.
	 * @param belongsTo {Array{[{}]}}
	 * @returns {Array{}}
	 */
	genBasicData(modelName, belongsTo_Id) {
		const keyList = this.getObjectDescriptor(modelName);
		//We now have an array like this: group: ['id', 'name'],
		const gennedVals = _.map(keyList, key => {
			let genProp = genInfo[key];

			//Can't generate a value if the generator is null or genProp doesn't exist.
			if (typeof genProp === 'undefined' || typeof genProp.generator !== 'function') {
				if (_.has(belongsTo_Id, key)) {
					return [key, belongsTo_Id[key]];
				}

				return [key, undefined];
			}

			return [key, belongsTo_Id[key]];
		});
	}

	/**
	 * @param {Integer} id
	 * @param {String} name
	 * @param {String} key - key = tbl's fk column
	 * @param {Integer} value - key = tbl's fk value
	 */
	dtaBuilder(id, name, key, value) {
		let dta = {
			id: id,
			name: name
		};

		dta[key] = value;
		return dta;
	}
}
