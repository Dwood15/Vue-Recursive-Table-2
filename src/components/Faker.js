const defaultDictionary = [
  'foo',
  'bazz',
  'bar',
  'oof',
  'ouch',
  'owie',
  'my',
  'bones',
  'yes',
  'this',
  'is',
  'terrible',
  'but',
  'the',
  'quick',
  'brown',
  'fox',
  'jumped',
  'over',
  'lazy',
  'dog',
  'lightning',
  'red',
  'blue',
  'yellow',
  'green',
  'red',
  'hello',
  'what',
  'a',
  'wonderful',
  'sunny',
  'day',
  'to',
  'be',
  'alive',
  'great',
  'amazing',
  'grand',
  'sky',
  'sunshine'
];

/**
 * Basic 'Faker' class for generating nonsensical data.
 * Name lifted from the php Faker library. Clearly, this is much less powerful.
 */
export default class Faker {
	/**
	 * Most of these are for string-related fakings, even though the class is meant to be able to do other things as well.
	 * @param dictionary {Array[string]}
	 * @param relimiter {string}  - Like a delimiter, but the opposite. Hah! I'm so clever.
	 * @param prefix {string}
	 * @param postfix {string}
	 */
  constructor(dictionary = defaultDictionary, relimiter = ' ', prefix = '', postfix = '') {
    this.dictionary = dictionary;
    this.relimiter = relimiter;
    this.prefix = prefix;
    this.postfix = postfix;
  }

	/**
	 * @param postfix {string} @default ''
	 */
  setPostfix = function (postfix = '') {
    this.postfix = postfix;
  };

	/**
	 * @param prefix (string)
	 */
  setPrefix = function (prefix = '') {
    this.prefix = prefix;
  };

	/**
	 * @param numWords {integer}
	 */
  genNonsense = function (numWords = 2) {
    let randomString = this.prefix;

    for (let i = 0; i < numWords; i++) {
      randomString = randomString + this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
      if (numWords > 1 && i < numWords - 1) {
        randomString = randomString + this.relimiter;
      }
    }

    return randomString + this.postfix;
  };

	/**
	 * @param numWordsInArray {integer} - Number of strings in array.
	 * @param numWords {integer} - Number of words per string
	 */
  genNonsenseArray = function (numWordsInArray = 4, numWords = 1) {
    let nonsenseArray = [];
    while (nonsenseArray.length < numWordsInArray) {
      nonsenseArray.push(this.genNonsense(numWords));
    }
    return nonsenseArray;
  };

	/**
	 * @param min {integer}
	 * @param max {integer}
	 */
  randInt = function (min, max) {
    const seed = Math.random() * (max - min);
    return Math.floor(min + seed);
  };
}
