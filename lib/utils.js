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

function getFileLocation(file, start){
  var contentMap = _.transform(file.source.split('\n'), function(result, line, index){
    result.push({
      content: line,
      chars: line.length,
      total: line.length + (_.get(_.last(result), 'total', 0)) + 1,
      index: index
    });
  }, []);

  var lineData = _.find(contentMap, function(l){
    return l.total > start;
  });

  var prevLineData = _.find(contentMap, function(l){
    return l.index === lineData.index - 1;
  });

  return {
    file: file.path,
    line: lineData.index + 1,
    col: start - prevLineData.total + 1
  }
}

module.exports = {
  typeOfArgAt: typeOfArgAt,
  migrateMethod: migrateMethod,
  isLiteral: _fp_.curry(isLiteral),
  isArgFunction: _fp_.curry(isArgFunction),
  isLodashChain: isLodashChain,
  getFileLocation: getFileLocation
};
