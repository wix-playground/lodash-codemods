/* eslint-disable */

// --------------------- this arg ----------------------
//<case:1>
_.forEach([1,2,3], function(a){console.log(a)}, this);
//<end>

// take off this param also in chains
//<case:2>
_([1,2,3]).map(function(n){return n * n;}, this).reduce(function(sum, n) {return sum + n;}, 0);
//<end>

//<case:3>
_.transform([1,2,3,4], function(res, n){res[n] = n*n*n}, {}, this);
//<end>

// -------------------- forEach ------------------------
//<case:4>
_([1,2,3]).map(function(n){return n * n;}).forEach(function(n){console.log(n);}).value();
//<end>

//<case:5>
_([1,2,3]).filter(function(n){return n%2 !== 0}).map(function(n){return n * n;}).value();
//<end>

//<case:6>
_([1,2,3]).forEach(function(n){console.log(n);}).value();
//<end>

// -------------------- other stuff --------------------
//<case:7>
_(['a:1', 'b:2', 'c:3']).invoke('split', ':').zipObject().value();
//<end>

// -------------------- split by -----------------------
//<case:8>
_.pick({a:1, b:2, c:3, d:4}, function(val){return val%2 === 0;});
//<end>

// should also run for santa/js/plugins/skintest
//<case:9>
_.pick({ 'user': 'fred', 'age': 40 }, 'user');
//<end>

// santaTypeUtils:26 pick with function identifier
//<case:10>
function isEven(val){return val%2 === 0;}
_.pick({a:1, b:2, c:3, d:4}, isEven);
//<end>

//-- bindAll no longer has a default behavior of binding all methods, methods must now be specified
//_.bindAll(this, _(_.forOwn(Object.getPrototypeOf(this))).pickBy(_.isFunction).keys().value());


//<case:11>
var thisArg = this;
_.pick({a:1, b:2, c:3, d:4}, isEven, thisArg);
//<end>

