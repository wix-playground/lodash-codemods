'use strict';

var _ = require('lodash');
var utils = require('./utils');
var fs = require('fs');

function getArgumentsString(args){
    var argTypes = _.map(args, function(a){
        if (a.type === '')
    })
}

module.exports = function transformer(file, api) {
    //console.log(file.path);
    var j = api.jscodeshift;
    var ast = j(file.source);
    ast.find(j.CallExpression, {
            type: 'CallExpression',
            callee: {
                type: 'MemberExpression',
                object: {
                    name: '_'
                }
            }
        .forEach(function (path) {
            var identifier = path.value.callee.property;
            var arguments = path.value.arguments;
            var fileLocation = utils.getFileLocation(file, identifier.start);
            var name = identifier.name;


            //fs.appendFileSync('l4LeakLogs.txt', elapsed + ':\t' + statsString + '\n');
        });


    return ast.toSource();
};
