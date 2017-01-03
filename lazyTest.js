var _ = require('lodash');

function run_cmd(cmd, args) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";
    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    return (new Promise(resolve => {
        child.stdout.on('end', () => resolve(resp));
    }));
}

function readFile(path){
    var fs = require('fs');
    return fs.readFileSync(path, "utf8");
}

function breakInToCases(text){
    var pattern = /^\/\/<case:(\d{1,4})>\s*\n?\s*([\s\S]*?)\n?\/\/<end>$/mg;
    var execRes;
    var cases = {};
    while (execRes = pattern.exec(text)){
        cases[execRes[1]] = execRes[2];
    }
    return cases;
}

function testCase(results, expectations, caseIndex) {
    if(_.isUndefined(results[caseIndex])){
        console.error('\x1b[31m', 'case: ' + caseIndex + ' missing from input file.' ,'\x1b[0m');
        return;
    }

    if(_.isUndefined(expectations[caseIndex])){
        console.error('\x1b[31m', 'case: ' + caseIndex + ' missing from output file.' ,'\x1b[0m');
        return;
    }

    if(results[caseIndex] !== expectations[caseIndex]){
        console.error('\x1b[31m', 'case: ' + caseIndex + ' expected ' + results[caseIndex] + ' to be ' + expectations[caseIndex] ,'\x1b[0m');
        return;
    }

    console.log('\x1b[32m', 'case: ' + caseIndex ,'\x1b[0m');
}

run_cmd('cp', ['lazyTestFiles/input.js', 'lazyTestFiles/temp.js'])
    .then(() => run_cmd('node', ['cli', '--from', '0.0.0', '--to', '4.0.0', 'lazyTestFiles/temp.js', '--force']))
    .then((output) => {
        console.log(output);
        var results = breakInToCases(readFile('lazyTestFiles/temp.js'));
        var expectations = breakInToCases(readFile('lazyTestFiles/output.js'));
        _(results).keys().union(_.keys(expectations)).forEach(_.partial(testCase, results, expectations, _));
    });
