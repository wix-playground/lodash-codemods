/* eslint-disable */

// --------------------- this arg ----------------------
//<case:1>
_.forEach([1,2,3], function(a){console.log(a)}, this);
//<end>

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
[1,2,3].forEach(function(n){console.log(n);}).value();
//<end>

// -------------------- other stuff --------------------
//<case:7>
_(['a:1', 'b:2', 'c:3']).invoke('split', ':').zipObject().value();
//<end>
