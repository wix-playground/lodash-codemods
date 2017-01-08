/* eslint-disable */

// --------------------- this arg ----------------------
//<case:1>
_.forEach([1,2,3], _.bind(function(a){console.log(a)}, this));
//<end>

//<case:2>
_([1,2,3]).map(_.bind(function(n){return n * n;}, this)).reduce(function(sum, n) {return sum + n;}, 0);
//<end>

//<case:3>
_.transform([1,2,3,4], _.bind(function(res, n){res[n] = n*n*n}, this), {});
//<end>

// -------------------- forEach ------------------------
//<case:4>
_([1,2,3]).map(function(n){return n * n;}).forEach(function(n){console.log(n);});
//<end>

//<case:5>
_([1,2,3]).filter(function(n){return n%2 !== 0}).map(function(n){return n * n;}).value();
//<end>

//<case:6>
[1,2,3].forEach(function(n){console.log(n);}).value();
//<end>

// -------------------- other stuff --------------------
//<case:7>
_(['a:1', 'b:2', 'c:3']).invokeMap('split', ':').fromPairs().value();
//<end>

// -------------------- split by -----------------------
//<case:8>
_.pickBy({a:1, b:2, c:3, d:4}, function(val){return val%2 === 0;});
//<end>

//<case:9>
_.pick({ 'user': 'fred', 'age': 40 }, 'user');
//<end>

//<case:10>
function isEven(val){return val%2 === 0;}
_.pickBy({a:1, b:2, c:3, d:4}, isEven);
//<end>

//<case:11>
var thisArg = this;
function safePick(){
    return _.assign(_.pick.apply(arguments), _.pickBy.apply(arguments));
}
_.pick({a:1, b:2, c:3, d:4}, isEven, thisArg);
//<end>
