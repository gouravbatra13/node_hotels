// var lodash = require('lodash');
var _= require('lodash');

/**
 * lodash deals with array (unqiue, filter, etc)
 */

var data = ['person',1,2,1,3,5,67,'person',3,6,"p"];

/**get uniqe data*/
// console.log(lodash.uniq(data));
console.log(_.uniq(data));
console.log(_.isString(data));