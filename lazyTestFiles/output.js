/* eslint-disable */

//<case:1>
_.forEach([1,2,3], _.bind(function(a){console.log(a)}, this));
//<end>

//<case:2>
_.forEach([4,5,6], _.bind(function(a){console.log(a)}, this));
//<end>
