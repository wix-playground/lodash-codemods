'use strict';

var _ = require('lodash');
var utils = require('./utils');

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
                    },
                    property: {
                        name: 'bind'
                    }
            }
        })
        .filter(function(path){
            return path.value.arguments.length === 2;
        })
        .forEach(function (path) {
            var exp = path.value;
            var obj = exp.arguments[0];
            var arg = exp.arguments[1];

            exp.callee.object = obj;
            exp.callee.property = j.identifier('bind');
            exp.arguments = [arg];
        });

    return ast.toSource();
};
