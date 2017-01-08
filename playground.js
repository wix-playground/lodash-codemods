var _ = require('lodash');

function foo(){
    console.log('foo');
}

function whereAmI(){
    var location = /^[^()]*\(([^:]*):(\d*):(\d*)\)$/.exec((new Error()).stack.split('\n')[2]);
    return {
        file: location[1],
        line: location[2],
        char: location[3]
    };
}

console.log(whereAmI());


_((new Error()).stack.split('\n').slice(1))
    .map(function(line) {
        return /.*\/packages\/([^:]*):(\d*):(\d*)/.exec(line);
    })
    .compact()
    .map(function(locationData){
        return {
            file: locationData[1],
            line: locationData[2],
            char: locationData[3]
        };
    })
    .first();
