/* eslint-disable */

//<case:1>
_.forEach([1,2,3], function(a){console.log(a)}, this);
//<end>

//<case:2>
_([1,2,3]).map(function(n){return n * n;}, this).reduce(function(sum, n) {return sum + n;}, 0);
//<end>

//<case:3>
_([1,2,3]).map(function(n){return n * n;}).forEach(function(n){console.log(n);}).value();
//<end>

//<case:4>
_([1,2,3]).filter(function(n){return n%2 !== 0}).map(function(n){return n * n;}).value();
//<end>

//<case:5>
[1,2,3].forEach(function(n){console.log(n);}).value();
//<end>
