var _ = require('lodash');
var childProcess = require('child_process');

_.forEach([
        '../santa/packages',
        '../santa/js/plugins/skintest'
    ],function(path){
        childProcess.spawn('node', ['cli', '--from', '0.0.0', '--to', '4.0.0', path, '--force']);
    });

