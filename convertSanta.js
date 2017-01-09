var _ = require('lodash');
var childProcess = require('child_process');

_.forEach([
        //'../santa/packages',
        '../santa/server',
        '../santa/static',
        //'../santa/js/plugins/skintest'
    ],function(path){
        var task = childProcess.spawn('node', ['cli', '--from', '0.0.0', '--to', '4.0.0', path, '--force']);
        task.stdout.on('data', (data) => {console.log(`stdout: ${data}`);});
        task.stderr.on('data', (data) => {console.log(`stderr: ${data}`);});
    });

