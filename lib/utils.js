'use strict';

var _fp_ = require('lodash/fp');
var _ = require('lodash');

function migrateMethod(selector, method, j, ast) {
  ast.find(selector.type, selector.properties)
  .filter(function (p) {
    var conditions = method.conditions || [];
    return conditions.every(function (cond) {
      return cond(p.value, false);
    });
  })
  .forEach(function (p) {
    method.actions.reduce(function (res, action) {
      return action(j, res, false);
    }, p);
  });
}

function isLiteral(value, arg) {
  return arg &&
    arg.type === 'Literal' &&
    arg.value === value;
}

var typeOfArgAt = _fp_.curry(function (_index, p) {
  var index = _index >= 0 ? _index : p.arguments.length + _index;
  return _fp_.get(['arguments', index, 'type'], p);
});

function isArgFunction(index, p) {
  return _fp_.flow(
    typeOfArgAt(index),
    _fp_.includes(_fp_, ['FunctionExpression', 'ArrowFunctionExpression'])
  )(p);
}

function isLodashChain(node) {
  if (_.get(node, 'callee.name') === '_'){
    return true;
  }

  if (_.get(node, 'callee.object.type') !== 'CallExpression'){
  }

  if (_.get(node, 'type') !== 'CallExpression'){
    return false;
  }

  return isLodashChain(_.get(node, 'callee.object'));
}

module.exports = {
  typeOfArgAt: typeOfArgAt,
  migrateMethod: migrateMethod,
  isLiteral: _fp_.curry(isLiteral),
  isArgFunction: _fp_.curry(isArgFunction),
  isLodashChain: isLodashChain
};
