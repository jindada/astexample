'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var types = _ref.types;

  console.log('>>>>>>>>>>>>>>>');
  var plugins = null;

  // Only for test
  global.__clearBabelAntdPlugin = function () {
    plugins = null;
  };

  function Program(path, _ref2) {
    var opts = _ref2.opts;

    // Init plugin instances once.
    if (!plugins) {
      if (Array.isArray(opts)) {
        plugins = opts.map(function (_ref3) {
          var libraryName = _ref3.libraryName,
              libraryDirectory = _ref3.libraryDirectory,
              style = _ref3.style,
              camel2DashComponentName = _ref3.camel2DashComponentName,
              camel2UnderlineComponentName = _ref3.camel2UnderlineComponentName;

          (0, _assert2.default)(libraryName, 'libraryName should be provided');
          return new _Plugin2.default(libraryName, libraryDirectory, style, camel2DashComponentName, camel2UnderlineComponentName, types);
        });
      } else {
        opts = opts || {};
        (0, _assert2.default)(opts.libraryName, 'libraryName should be provided');
        plugins = [new _Plugin2.default(opts.libraryName, opts.libraryDirectory, opts.style, opts.camel2DashComponentName, opts.camel2UnderlineComponentName, types)];
      }
    }
    applyInstance('Program', arguments, this);
  }

  var methods = ['ImportDeclaration', 'CallExpression', 'MemberExpression', 'Property', 'VariableDeclarator', 'LogicalExpression', 'ConditionalExpression', 'IfStatement', 'ExpressionStatement', 'ExportDefaultDeclaration'];
  //此处的method就是如"ImportDeclaration"等
  function applyInstance(method, args, context) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var plugin = _step.value;

        if (plugin[method]) {
          plugin[method].apply(plugin, [].concat(_toConsumableArray(args), [context]));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  var ret = {
    visitor: { Program: Program }
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var method = _step2.value;

      //为我们的Visitor添加babel处理规则，其中visitor中每一个属性的值都是一个函数
      ret.visitor[method] = function () {
        applyInstance(method, arguments, ret.visitor);
      };
    };

    for (var _iterator2 = methods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return ret;
};

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Plugin = require('./Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//默认这里传入的参数是babel，可以通过babel.types获取types，这里使用了解构的方式


module.exports = exports['default'];