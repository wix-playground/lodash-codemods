'use strict';

var _ = require('lodash');

function isLodashChain(node) {
  if (_.get(node, 'type') !== 'CallExpression'){
    return false;
  }

  if (_.get(node, 'callee.name') === '_'){
    return true;
  }

  return isLodashChain(_.get(node, 'callee.object'));
}

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
    return isLodashChain(path.value.expression);
  })
  .forEach(function (path) {
    path.value.expression = path.value.expression.callee.object;
  });

  return ast.toSource();
};
