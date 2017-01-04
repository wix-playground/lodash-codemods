'use strict';

var _ = require('lodash');
var utils = require('./utils');

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);
  ast.find(j.ExpressionStatement, {
    expression: {
      type: 'CallExpression',
      callee: {
        property: {name: 'value'},
        object: {
          callee: {
            property: {name: 'forEach'}
          }
        }
      }
    }
  })
  .filter(function(path){
    return utils.isLodashChain(path.value.expression);
  })
  .forEach(function (path) {
    path.value.expression = path.value.expression.callee.object;
  });

  return ast.toSource();
};
