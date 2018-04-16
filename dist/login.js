webpackJsonp([1],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.isFormField = isFormField;
exports["default"] = createFormField;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Field = function Field(fields) {
  (0, _classCallCheck3["default"])(this, Field);

  (0, _extends3["default"])(this, fields);
};

function isFormField(obj) {
  return obj instanceof Field;
}

function createFormField(field) {
  if (isFormField(field)) {
    return field;
  }
  return new Field(field);
}

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentWithPureRenderMixin
 */

var shallowEqual = __webpack_require__(195);

function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 *
 * See https://facebook.github.io/react/docs/pure-render-mixin.html
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FIELD_META_PROP = exports.FIELD_META_PROP = 'data-__meta';
var FIELD_DATA_PROP = exports.FIELD_DATA_PROP = 'data-__field';

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

__webpack_require__(200);

__webpack_require__(201);

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(202);
module.exports = self.fetch.bind(self);


/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _rcNotification = __webpack_require__(126);

var _rcNotification2 = _interopRequireDefault(_rcNotification);

var _icon = __webpack_require__(17);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var defaultDuration = 3;
var defaultTop = void 0;
var messageInstance = void 0;
var key = 1;
var prefixCls = 'ant-message';
var transitionName = 'move-up';
var getContainer = void 0;
function getMessageInstance(callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    _rcNotification2['default'].newInstance({
        prefixCls: prefixCls,
        transitionName: transitionName,
        style: { top: defaultTop },
        getContainer: getContainer
    }, function (instance) {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
}
function notice(content) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDuration;
    var type = arguments[2];
    var onClose = arguments[3];

    var iconType = {
        info: 'info-circle',
        success: 'check-circle',
        error: 'cross-circle',
        warning: 'exclamation-circle',
        loading: 'loading'
    }[type];
    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    }
    var target = key++;
    getMessageInstance(function (instance) {
        instance.notice({
            key: target,
            duration: duration,
            style: {},
            content: React.createElement(
                'div',
                { className: prefixCls + '-custom-content ' + prefixCls + '-' + type },
                React.createElement(_icon2['default'], { type: iconType }),
                React.createElement(
                    'span',
                    null,
                    content
                )
            ),
            onClose: onClose
        });
    });
    return function () {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
}
exports['default'] = {
    info: function info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success: function success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error: function error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },

    // Departed usage, please use warning()
    warn: function warn(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    warning: function warning(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    loading: function loading(content, duration, onClose) {
        return notice(content, duration, 'loading', onClose);
    },
    config: function config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
        if (options.transitionName !== undefined) {
            transitionName = options.transitionName;
            messageInstance = null; // delete messageInstance for new transitionName
        }
    },
    destroy: function destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
module.exports = exports['default'];

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = __webpack_require__(1);

var _extends5 = _interopRequireDefault(_extends4);

var _typeof2 = __webpack_require__(21);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
var enquire = void 0;
if (typeof window !== 'undefined') {
    var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
        return {
            media: mediaQuery,
            matches: false,
            addListener: function addListener() {},
            removeListener: function removeListener() {}
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
    enquire = __webpack_require__(135);
}

var responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
var responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};

var Row = function (_React$Component) {
    (0, _inherits3['default'])(Row, _React$Component);

    function Row() {
        (0, _classCallCheck3['default'])(this, Row);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));

        _this.state = {
            screens: {}
        };
        return _this;
    }

    (0, _createClass3['default'])(Row, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            Object.keys(responsiveMap).map(function (screen) {
                return enquire.register(responsiveMap[screen], {
                    match: function match() {
                        if ((0, _typeof3['default'])(_this2.props.gutter) !== 'object') {
                            return;
                        }
                        _this2.setState(function (prevState) {
                            return {
                                screens: (0, _extends5['default'])({}, prevState.screens, (0, _defineProperty3['default'])({}, screen, true))
                            };
                        });
                    },
                    unmatch: function unmatch() {
                        if ((0, _typeof3['default'])(_this2.props.gutter) !== 'object') {
                            return;
                        }
                        _this2.setState(function (prevState) {
                            return {
                                screens: (0, _extends5['default'])({}, prevState.screens, (0, _defineProperty3['default'])({}, screen, false))
                            };
                        });
                    },
                    // Keep a empty destory to avoid triggering unmatch when unregister
                    destroy: function destroy() {}
                });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            Object.keys(responsiveMap).map(function (screen) {
                return enquire.unregister(responsiveMap[screen]);
            });
        }
    }, {
        key: 'getGutter',
        value: function getGutter() {
            var gutter = this.props.gutter;

            if ((typeof gutter === 'undefined' ? 'undefined' : (0, _typeof3['default'])(gutter)) === 'object') {
                for (var i = 0; i <= responsiveArray.length; i++) {
                    var breakpoint = responsiveArray[i];
                    if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
                        return gutter[breakpoint];
                    }
                }
            }
            return gutter;
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                type = _a.type,
                justify = _a.justify,
                align = _a.align,
                className = _a.className,
                style = _a.style,
                children = _a.children,
                _a$prefixCls = _a.prefixCls,
                prefixCls = _a$prefixCls === undefined ? 'ant-row' : _a$prefixCls,
                others = __rest(_a, ["type", "justify", "align", "className", "style", "children", "prefixCls"]);
            var gutter = this.getGutter();
            var classes = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls, !type), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type, type), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type + '-' + justify, type && justify), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type + '-' + align, type && align), _classNames), className);
            var rowStyle = gutter > 0 ? (0, _extends5['default'])({ marginLeft: gutter / -2, marginRight: gutter / -2 }, style) : style;
            var cols = _react.Children.map(children, function (col) {
                if (!col) {
                    return null;
                }
                if (col.props && gutter > 0) {
                    return (0, _react.cloneElement)(col, {
                        style: (0, _extends5['default'])({ paddingLeft: gutter / 2, paddingRight: gutter / 2 }, col.props.style)
                    });
                }
                return col;
            });
            var otherProps = (0, _extends5['default'])({}, others);
            delete otherProps.gutter;
            return React.createElement(
                'div',
                (0, _extends5['default'])({}, otherProps, { className: classes, style: rowStyle }),
                cols
            );
        }
    }]);
    return Row;
}(React.Component);

exports['default'] = Row;

Row.defaultProps = {
    gutter: 0
};
Row.propTypes = {
    type: _propTypes2['default'].string,
    align: _propTypes2['default'].string,
    justify: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].node,
    gutter: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].number]),
    prefixCls: _propTypes2['default'].string
};
module.exports = exports['default'];

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(1);

var _extends4 = _interopRequireDefault(_extends3);

var _typeof2 = __webpack_require__(21);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var stringOrNumber = _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]);
var objectOrNumber = _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].number]);

var Col = function (_React$Component) {
    (0, _inherits3['default'])(Col, _React$Component);

    function Col() {
        (0, _classCallCheck3['default'])(this, Col);
        return (0, _possibleConstructorReturn3['default'])(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Col, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var props = this.props;

            var span = props.span,
                order = props.order,
                offset = props.offset,
                push = props.push,
                pull = props.pull,
                className = props.className,
                children = props.children,
                _props$prefixCls = props.prefixCls,
                prefixCls = _props$prefixCls === undefined ? 'ant-col' : _props$prefixCls,
                others = __rest(props, ["span", "order", "offset", "push", "pull", "className", "children", "prefixCls"]);

            var sizeClassObj = {};
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(function (size) {
                var _extends2;

                var sizeProps = {};
                if (typeof props[size] === 'number') {
                    sizeProps.span = props[size];
                } else if ((0, _typeof3['default'])(props[size]) === 'object') {
                    sizeProps = props[size] || {};
                }
                delete others[size];
                sizeClassObj = (0, _extends4['default'])({}, sizeClassObj, (_extends2 = {}, (0, _defineProperty3['default'])(_extends2, prefixCls + '-' + size + '-' + sizeProps.span, sizeProps.span !== undefined), (0, _defineProperty3['default'])(_extends2, prefixCls + '-' + size + '-order-' + sizeProps.order, sizeProps.order || sizeProps.order === 0), (0, _defineProperty3['default'])(_extends2, prefixCls + '-' + size + '-offset-' + sizeProps.offset, sizeProps.offset || sizeProps.offset === 0), (0, _defineProperty3['default'])(_extends2, prefixCls + '-' + size + '-push-' + sizeProps.push, sizeProps.push || sizeProps.push === 0), (0, _defineProperty3['default'])(_extends2, prefixCls + '-' + size + '-pull-' + sizeProps.pull, sizeProps.pull || sizeProps.pull === 0), _extends2));
            });
            var classes = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + span, span !== undefined), (0, _defineProperty3['default'])(_classNames, prefixCls + '-order-' + order, order), (0, _defineProperty3['default'])(_classNames, prefixCls + '-offset-' + offset, offset), (0, _defineProperty3['default'])(_classNames, prefixCls + '-push-' + push, push), (0, _defineProperty3['default'])(_classNames, prefixCls + '-pull-' + pull, pull), _classNames), className, sizeClassObj);
            return React.createElement(
                'div',
                (0, _extends4['default'])({}, others, { className: classes }),
                children
            );
        }
    }]);
    return Col;
}(React.Component);

exports['default'] = Col;

Col.propTypes = {
    span: stringOrNumber,
    order: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
    xl: objectOrNumber,
    xxl: objectOrNumber
};
module.exports = exports['default'];

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

__webpack_require__(199);

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(10);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = __webpack_require__(15);

var _omit2 = _interopRequireDefault(_omit);

var _icon = __webpack_require__(17);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
// Insert one space between two chinese characters automatically.
function insertSpace(child, needInserted) {
    // Check the child if is undefined or null.
    if (child == null) {
        return;
    }
    var SPACE = needInserted ? ' ' : '';
    // strictNullChecks oops.
    if (typeof child !== 'string' && typeof child !== 'number' && isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
    }
    if (typeof child === 'string') {
        if (isTwoCNChar(child)) {
            child = child.split('').join(SPACE);
        }
        return React.createElement(
            'span',
            null,
            child
        );
    }
    return child;
}

var Button = function (_React$Component) {
    (0, _inherits3['default'])(Button, _React$Component);

    function Button(props) {
        (0, _classCallCheck3['default'])(this, Button);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.handleClick = function (e) {
            // Add click effect
            _this.setState({ clicked: true });
            clearTimeout(_this.timeout);
            _this.timeout = window.setTimeout(function () {
                return _this.setState({ clicked: false });
            }, 500);
            var onClick = _this.props.onClick;
            if (onClick) {
                onClick(e);
            }
        };
        _this.state = {
            loading: props.loading,
            clicked: false,
            hasTwoCNChar: false
        };
        return _this;
    }

    (0, _createClass3['default'])(Button, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fixTwoCNChar();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var currentLoading = this.props.loading;
            var loading = nextProps.loading;
            if (currentLoading) {
                clearTimeout(this.delayTimeout);
            }
            if (typeof loading !== 'boolean' && loading && loading.delay) {
                this.delayTimeout = window.setTimeout(function () {
                    return _this2.setState({ loading: loading });
                }, loading.delay);
            } else {
                this.setState({ loading: loading });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.fixTwoCNChar();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
    }, {
        key: 'fixTwoCNChar',
        value: function fixTwoCNChar() {
            // Fix for HOC usage like <FormatMessage />
            var node = (0, _reactDom.findDOMNode)(this);
            var buttonText = node.textContent || node.innerText;
            if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
                if (!this.state.hasTwoCNChar) {
                    this.setState({
                        hasTwoCNChar: true
                    });
                }
            } else if (this.state.hasTwoCNChar) {
                this.setState({
                    hasTwoCNChar: false
                });
            }
        }
    }, {
        key: 'isNeedInserted',
        value: function isNeedInserted() {
            var _props = this.props,
                loading = _props.loading,
                icon = _props.icon,
                children = _props.children;

            var iconType = loading ? 'loading' : icon;
            return React.Children.count(children) === 1 && (!iconType || iconType === 'loading');
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this3 = this;

            var _a = this.props,
                type = _a.type,
                shape = _a.shape,
                size = _a.size,
                className = _a.className,
                htmlType = _a.htmlType,
                children = _a.children,
                icon = _a.icon,
                prefixCls = _a.prefixCls,
                ghost = _a.ghost,
                others = __rest(_a, ["type", "shape", "size", "className", "htmlType", "children", "icon", "prefixCls", "ghost"]);var _state = this.state,
                loading = _state.loading,
                clicked = _state.clicked,
                hasTwoCNChar = _state.hasTwoCNChar;
            // large => lg
            // small => sm

            var sizeCls = '';
            switch (size) {
                case 'large':
                    sizeCls = 'lg';
                    break;
                case 'small':
                    sizeCls = 'sm';
                default:
                    break;
            }
            var ComponentProp = others.href ? 'a' : 'button';
            var classes = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type, type), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + shape, shape), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + sizeCls, sizeCls), (0, _defineProperty3['default'])(_classNames, prefixCls + '-icon-only', !children && icon), (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', loading), (0, _defineProperty3['default'])(_classNames, prefixCls + '-clicked', clicked), (0, _defineProperty3['default'])(_classNames, prefixCls + '-background-ghost', ghost), (0, _defineProperty3['default'])(_classNames, prefixCls + '-two-chinese-chars', hasTwoCNChar), _classNames));
            var iconType = loading ? 'loading' : icon;
            var iconNode = iconType ? React.createElement(_icon2['default'], { type: iconType }) : null;
            var kids = children || children === 0 ? React.Children.map(children, function (child) {
                return insertSpace(child, _this3.isNeedInserted());
            }) : null;
            return React.createElement(
                ComponentProp,
                (0, _extends3['default'])({}, (0, _omit2['default'])(others, ['loading']), { type: others.href ? undefined : htmlType || 'button', className: classes, onClick: this.handleClick }),
                iconNode,
                kids
            );
        }
    }]);
    return Button;
}(React.Component);

exports['default'] = Button;

Button.__ANT_BUTTON = true;
Button.defaultProps = {
    prefixCls: 'ant-btn',
    loading: false,
    ghost: false
};
Button.propTypes = {
    type: _propTypes2['default'].string,
    shape: _propTypes2['default'].oneOf(['circle', 'circle-outline']),
    size: _propTypes2['default'].oneOf(['large', 'default', 'small']),
    htmlType: _propTypes2['default'].oneOf(['submit', 'button', 'reset']),
    onClick: _propTypes2['default'].func,
    loading: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    className: _propTypes2['default'].string,
    icon: _propTypes2['default'].string
};
module.exports = exports['default'];

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = __webpack_require__(15);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Icon = function Icon(props) {
    var type = props.type,
        _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className,
        spin = props.spin;

    var classString = (0, _classnames2['default'])((0, _defineProperty3['default'])({
        anticon: true,
        'anticon-spin': !!spin || type === 'loading'
    }, 'anticon-' + type, true), className);
    return React.createElement('i', (0, _extends3['default'])({}, (0, _omit2['default'])(props, ['type', 'spin']), { className: classString }));
};
exports['default'] = Icon;
module.exports = exports['default'];

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var ButtonGroup = function ButtonGroup(props) {
    var _props$prefixCls = props.prefixCls,
        prefixCls = _props$prefixCls === undefined ? 'ant-btn-group' : _props$prefixCls,
        size = props.size,
        className = props.className,
        others = __rest(props, ["prefixCls", "size", "className"]);
    // large => lg
    // small => sm


    var sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
        default:
            break;
    }
    var classes = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-' + sizeCls, sizeCls), className);
    return React.createElement('div', (0, _extends3['default'])({}, others, { className: classes }));
};
exports['default'] = ButtonGroup;
module.exports = exports['default'];

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Group = function Group(props) {
    var _classNames;

    var _props$prefixCls = props.prefixCls,
        prefixCls = _props$prefixCls === undefined ? 'ant-input-group' : _props$prefixCls,
        _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className;

    var cls = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', props.size === 'large'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', props.size === 'small'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-compact', props.compact), _classNames), className);
    return React.createElement(
        'span',
        { className: cls, style: props.style },
        props.children
    );
};
exports['default'] = Group;
module.exports = exports['default'];

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _Input = __webpack_require__(93);

var _Input2 = _interopRequireDefault(_Input);

var _icon = __webpack_require__(17);

var _icon2 = _interopRequireDefault(_icon);

var _button = __webpack_require__(32);

var _button2 = _interopRequireDefault(_button);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Search = function (_React$Component) {
    (0, _inherits3['default'])(Search, _React$Component);

    function Search() {
        (0, _classCallCheck3['default'])(this, Search);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

        _this.onSearch = function () {
            var onSearch = _this.props.onSearch;

            if (onSearch) {
                onSearch(_this.input.input.value);
            }
            _this.input.focus();
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Search, [{
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }
    }, {
        key: 'getButtonOrIcon',
        value: function getButtonOrIcon() {
            var _props = this.props,
                enterButton = _props.enterButton,
                prefixCls = _props.prefixCls,
                size = _props.size;

            if (!enterButton) {
                return React.createElement(_icon2['default'], { className: prefixCls + '-icon', type: 'search', key: 'searchIcon' });
            }
            var enterButtonAsElement = enterButton;
            if (enterButtonAsElement.type === _button2['default'] || enterButtonAsElement.type === 'button') {
                return React.cloneElement(enterButtonAsElement, enterButtonAsElement.type === _button2['default'] ? {
                    className: prefixCls + '-button',
                    size: size,
                    onClick: this.onSearch
                } : {
                    onClick: this.onSearch
                });
            }
            return React.createElement(
                _button2['default'],
                { className: prefixCls + '-button', type: 'primary', size: size, onClick: this.onSearch, key: 'enterButton' },
                enterButton === true ? React.createElement(_icon2['default'], { type: 'search' }) : enterButton
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                className = _a.className,
                prefixCls = _a.prefixCls,
                inputPrefixCls = _a.inputPrefixCls,
                size = _a.size,
                suffix = _a.suffix,
                enterButton = _a.enterButton,
                others = __rest(_a, ["className", "prefixCls", "inputPrefixCls", "size", "suffix", "enterButton"]);
            delete others.onSearch;
            var buttonOrIcon = this.getButtonOrIcon();
            var searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
            var inputClassName = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-enter-button', !!enterButton), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + size, !!size), _classNames));
            return React.createElement(_Input2['default'], (0, _extends3['default'])({ onPressEnter: this.onSearch }, others, { size: size, className: inputClassName, prefixCls: inputPrefixCls, suffix: searchSuffix, ref: this.saveInput }));
        }
    }]);
    return Search;
}(React.Component);

exports['default'] = Search;

Search.defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-search',
    enterButton: false
};
module.exports = exports['default'];

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _omit = __webpack_require__(15);

var _omit2 = _interopRequireDefault(_omit);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _calculateNodeHeight = __webpack_require__(179);

var _calculateNodeHeight2 = _interopRequireDefault(_calculateNodeHeight);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

var TextArea = function (_React$Component) {
    (0, _inherits3['default'])(TextArea, _React$Component);

    function TextArea() {
        (0, _classCallCheck3['default'])(this, TextArea);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));

        _this.state = {
            textareaStyles: {}
        };
        _this.resizeTextarea = function () {
            var autosize = _this.props.autosize;

            if (!autosize || !_this.textAreaRef) {
                return;
            }
            var minRows = autosize ? autosize.minRows : null;
            var maxRows = autosize ? autosize.maxRows : null;
            var textareaStyles = (0, _calculateNodeHeight2['default'])(_this.textAreaRef, false, minRows, maxRows);
            _this.setState({ textareaStyles: textareaStyles });
        };
        _this.handleTextareaChange = function (e) {
            if (!('value' in _this.props)) {
                _this.resizeTextarea();
            }
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange(e);
            }
        };
        _this.handleKeyDown = function (e) {
            var _this$props = _this.props,
                onPressEnter = _this$props.onPressEnter,
                onKeyDown = _this$props.onKeyDown;

            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        _this.saveTextAreaRef = function (textArea) {
            _this.textAreaRef = textArea;
        };
        return _this;
    }

    (0, _createClass3['default'])(TextArea, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeTextarea();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // Re-render with the new content then recalculate the height as required.
            if (this.props.value !== nextProps.value) {
                if (this.nextFrameActionId) {
                    clearNextFrameAction(this.nextFrameActionId);
                }
                this.nextFrameActionId = onNextFrame(this.resizeTextarea);
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.textAreaRef.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.textAreaRef.blur();
        }
    }, {
        key: 'getTextAreaClassName',
        value: function getTextAreaClassName() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                disabled = _props.disabled;

            return (0, _classnames2['default'])(prefixCls, className, (0, _defineProperty3['default'])({}, prefixCls + '-disabled', disabled));
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var otherProps = (0, _omit2['default'])(props, ['prefixCls', 'onPressEnter', 'autosize']);
            var style = (0, _extends3['default'])({}, props.style, this.state.textareaStyles);
            // Fix https://github.com/ant-design/ant-design/issues/6776
            // Make sure it could be reset when using form.getFieldDecorator
            if ('value' in otherProps) {
                otherProps.value = otherProps.value || '';
            }
            return React.createElement('textarea', (0, _extends3['default'])({}, otherProps, { className: this.getTextAreaClassName(), style: style, onKeyDown: this.handleKeyDown, onChange: this.handleTextareaChange, ref: this.saveTextAreaRef }));
        }
    }]);
    return TextArea;
}(React.Component);

exports['default'] = TextArea;

TextArea.defaultProps = {
    prefixCls: 'ant-input'
};
module.exports = exports['default'];

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = calculateNodeHeight;
// Thanks to https://github.com/andreypopp/react-textarea-autosize/
/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */
var HIDDEN_TEXTAREA_STYLE = '\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';
var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];
var computedStyleCache = {};
var hiddenTextarea = void 0;
function calculateNodeStyling(node) {
    var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');
    if (useCache && computedStyleCache[nodeRef]) {
        return computedStyleCache[nodeRef];
    }
    var style = window.getComputedStyle(node);
    var boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing');
    var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
    var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
    var sizingStyle = SIZING_STYLE.map(function (name) {
        return name + ':' + style.getPropertyValue(name);
    }).join(';');
    var nodeInfo = {
        sizingStyle: sizingStyle,
        paddingSize: paddingSize,
        borderSize: borderSize,
        boxSizing: boxSizing
    };
    if (useCache && nodeRef) {
        computedStyleCache[nodeRef] = nodeInfo;
    }
    return nodeInfo;
}
function calculateNodeHeight(uiTextNode) {
    var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }
    // Fix wrap="off" issue
    // https://github.com/ant-design/ant-design/issues/6577
    if (uiTextNode.getAttribute('wrap')) {
        hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
    } else {
        hiddenTextarea.removeAttribute('wrap');
    }
    // Copy all CSS properties that have an impact on the height of the content in
    // the textbox

    var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
        paddingSize = _calculateNodeStyling.paddingSize,
        borderSize = _calculateNodeStyling.borderSize,
        boxSizing = _calculateNodeStyling.boxSizing,
        sizingStyle = _calculateNodeStyling.sizingStyle;
    // Need to have the overflow attribute to hide the scrollbar otherwise
    // text-lines will not calculated properly as the shadow will technically be
    // narrower for content


    hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);
    hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';
    var minHeight = Number.MIN_SAFE_INTEGER;
    var maxHeight = Number.MAX_SAFE_INTEGER;
    var height = hiddenTextarea.scrollHeight;
    var overflowY = void 0;
    if (boxSizing === 'border-box') {
        // border-box: add border, since height = content + padding + border
        height = height + borderSize;
    } else if (boxSizing === 'content-box') {
        // remove padding, since height = content
        height = height - paddingSize;
    }
    if (minRows !== null || maxRows !== null) {
        // measure height of a textarea with a single row
        hiddenTextarea.value = ' ';
        var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
        if (minRows !== null) {
            minHeight = singleRowHeight * minRows;
            if (boxSizing === 'border-box') {
                minHeight = minHeight + paddingSize + borderSize;
            }
            height = Math.max(minHeight, height);
        }
        if (maxRows !== null) {
            maxHeight = singleRowHeight * maxRows;
            if (boxSizing === 'border-box') {
                maxHeight = maxHeight + paddingSize + borderSize;
            }
            overflowY = height > maxHeight ? '' : 'hidden';
            height = Math.min(maxHeight, height);
        }
    }
    // Remove scroll bar flash when autosize without maxRows
    if (!maxRows) {
        overflowY = 'hidden';
    }
    return { height: height, minHeight: minHeight, maxHeight: maxHeight, overflowY: overflowY };
}
module.exports = exports['default'];

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _createDOMForm = __webpack_require__(183);

var _createDOMForm2 = _interopRequireDefault(_createDOMForm);

var _createFormField = __webpack_require__(100);

var _createFormField2 = _interopRequireDefault(_createFormField);

var _PureRenderMixin = __webpack_require__(102);

var _PureRenderMixin2 = _interopRequireDefault(_PureRenderMixin);

var _omit = __webpack_require__(15);

var _omit2 = _interopRequireDefault(_omit);

var _warning = __webpack_require__(46);

var _warning2 = _interopRequireDefault(_warning);

var _FormItem = __webpack_require__(196);

var _FormItem2 = _interopRequireDefault(_FormItem);

var _constants = __webpack_require__(103);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Form = function (_React$Component) {
    (0, _inherits3['default'])(Form, _React$Component);

    function Form(props) {
        (0, _classCallCheck3['default'])(this, Form);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        (0, _warning2['default'])(!props.form, 'It is unnecessary to pass `form` to `Form` after antd@1.7.0.');
        return _this;
    }

    (0, _createClass3['default'])(Form, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _PureRenderMixin2['default'].shouldComponentUpdate.apply(this, args);
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            var layout = this.props.layout;

            return {
                vertical: layout === 'vertical'
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                hideRequiredMark = _props.hideRequiredMark,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                layout = _props.layout;

            var formClassName = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-horizontal', layout === 'horizontal'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-vertical', layout === 'vertical'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-inline', layout === 'inline'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-hide-required-mark', hideRequiredMark), _classNames), className);
            var formProps = (0, _omit2['default'])(this.props, ['prefixCls', 'className', 'layout', 'form', 'hideRequiredMark']);
            return React.createElement('form', (0, _extends3['default'])({}, formProps, { className: formClassName }));
        }
    }]);
    return Form;
}(React.Component);

exports['default'] = Form;

Form.defaultProps = {
    prefixCls: 'ant-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit: function onSubmit(e) {
        e.preventDefault();
    }
};
Form.propTypes = {
    prefixCls: _propTypes2['default'].string,
    layout: _propTypes2['default'].oneOf(['horizontal', 'inline', 'vertical']),
    children: _propTypes2['default'].any,
    onSubmit: _propTypes2['default'].func,
    hideRequiredMark: _propTypes2['default'].bool
};
Form.childContextTypes = {
    vertical: _propTypes2['default'].bool
};
Form.Item = _FormItem2['default'];
Form.createFormField = _createFormField2['default'];
Form.create = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _createDOMForm2['default'])((0, _extends3['default'])({ fieldNameProp: 'id' }, options, { fieldMetaProp: _constants.FIELD_META_PROP, fieldDataProp: _constants.FIELD_DATA_PROP }));
};
module.exports = exports['default'];

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _reactDom = __webpack_require__(10);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domScrollIntoView = __webpack_require__(76);

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _has = __webpack_require__(77);

var _has2 = _interopRequireDefault(_has);

var _createBaseForm = __webpack_require__(98);

var _createBaseForm2 = _interopRequireDefault(_createBaseForm);

var _createForm = __webpack_require__(194);

var _utils = __webpack_require__(66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function computedStyle(el, prop) {
  var getComputedStyle = window.getComputedStyle;
  var style =
  // If we have getComputedStyle
  getComputedStyle ?
  // Query it
  // TODO: From CSS-Query notes, we might need (node, null) for FF
  getComputedStyle(el) :

  // Otherwise, we are in IE and use currentStyle
  el.currentStyle;
  if (style) {
    return style[
    // Switch to camelCase for CSSOM
    // DEV: Grabbed from jQuery
    // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
    // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
    prop.replace(/-(\w)/gi, function (word, letter) {
      return letter.toUpperCase();
    })];
  }
  return undefined;
}

function getScrollableContainer(n) {
  var node = n;
  var nodeName = void 0;
  /* eslint no-cond-assign:0 */
  while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
    var overflowY = computedStyle(node, 'overflowY');
    // https://stackoverflow.com/a/36900407/3040605
    if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentNode;
  }
  return nodeName === 'body' ? node.ownerDocument : node;
}

var mixin = {
  getForm: function getForm() {
    return (0, _extends3['default'])({}, _createForm.mixin.getForm.call(this), {
      validateFieldsAndScroll: this.validateFieldsAndScroll
    });
  },
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _this = this;

    var _getParams = (0, _utils.getParams)(ns, opt, cb),
        names = _getParams.names,
        callback = _getParams.callback,
        options = _getParams.options;

    var newCb = function newCb(error, values) {
      if (error) {
        var validNames = _this.fieldsStore.getValidFieldsName();
        var firstNode = void 0;
        var firstTop = void 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = validNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var name = _step.value;

            if ((0, _has2['default'])(error, name)) {
              var instance = _this.getFieldInstance(name);
              if (instance) {
                var node = _reactDom2['default'].findDOMNode(instance);
                var top = node.getBoundingClientRect().top;
                if (firstTop === undefined || firstTop > top) {
                  firstTop = top;
                  firstNode = node;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (firstNode) {
          var c = options.container || getScrollableContainer(firstNode);
          (0, _domScrollIntoView2['default'])(firstNode, c, (0, _extends3['default'])({
            onlyScrollIfNeeded: true
          }, options.scroll));
        }
      }

      if (typeof callback === 'function') {
        callback(error, values);
      }
    };

    return this.validateFields(names, options, newCb);
  }
};

function createDOMForm(option) {
  return (0, _createBaseForm2['default'])((0, _extends3['default'])({}, option), [mixin]);
}

exports['default'] = createDOMForm;
module.exports = exports['default'];

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

exports['default'] = createFieldsStore;

var _set = __webpack_require__(78);

var _set2 = _interopRequireDefault(_set);

var _createFormField = __webpack_require__(100);

var _createFormField2 = _interopRequireDefault(_createFormField);

var _utils = __webpack_require__(66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function partOf(a, b) {
  return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

var FieldsStore = function () {
  function FieldsStore(fields) {
    (0, _classCallCheck3['default'])(this, FieldsStore);

    _initialiseProps.call(this);

    this.fields = this.flattenFields(fields);
    this.fieldsMeta = {};
  }

  (0, _createClass3['default'])(FieldsStore, [{
    key: 'updateFields',
    value: function updateFields(fields) {
      this.fields = this.flattenFields(fields);
    }
  }, {
    key: 'flattenFields',
    value: function flattenFields(fields) {
      return (0, _utils.flattenFields)(fields, function (_, node) {
        return (0, _createFormField.isFormField)(node);
      }, 'You must wrap field data with `createFormField`.');
    }
  }, {
    key: 'flattenRegisteredFields',
    value: function flattenRegisteredFields(fields) {
      var validFieldsName = this.getAllFieldsName();
      return (0, _utils.flattenFields)(fields, function (path) {
        return validFieldsName.indexOf(path) >= 0;
      }, 'You cannot set field before registering it.');
    }
  }, {
    key: 'setFields',
    value: function setFields(fields) {
      var _this = this;

      var fieldsMeta = this.fieldsMeta;
      var nowFields = (0, _extends3['default'])({}, this.fields, fields);
      var nowValues = {};
      Object.keys(fieldsMeta).forEach(function (f) {
        return nowValues[f] = _this.getValueFromFields(f, nowFields);
      });
      Object.keys(nowValues).forEach(function (f) {
        var value = nowValues[f];
        var fieldMeta = _this.getFieldMeta(f);
        if (fieldMeta && fieldMeta.normalize) {
          var nowValue = fieldMeta.normalize(value, _this.getValueFromFields(f, _this.fields), nowValues);
          if (nowValue !== value) {
            nowFields[f] = (0, _extends3['default'])({}, nowFields[f], {
              value: nowValue
            });
          }
        }
      });
      this.fields = nowFields;
    }
  }, {
    key: 'resetFields',
    value: function resetFields(ns) {
      var fields = this.fields;

      var names = ns ? this.getValidFieldsFullName(ns) : this.getAllFieldsName();
      return names.reduce(function (acc, name) {
        var field = fields[name];
        if (field && 'value' in field) {
          acc[name] = {};
        }
        return acc;
      }, {});
    }
  }, {
    key: 'setFieldMeta',
    value: function setFieldMeta(name, meta) {
      this.fieldsMeta[name] = meta;
    }
  }, {
    key: 'getFieldMeta',
    value: function getFieldMeta(name) {
      this.fieldsMeta[name] = this.fieldsMeta[name] || {};
      return this.fieldsMeta[name];
    }
  }, {
    key: 'getValueFromFields',
    value: function getValueFromFields(name, fields) {
      var field = fields[name];
      if (field && 'value' in field) {
        return field.value;
      }
      var fieldMeta = this.getFieldMeta(name);
      return fieldMeta && fieldMeta.initialValue;
    }
  }, {
    key: 'getValidFieldsName',
    value: function getValidFieldsName() {
      var _this2 = this;

      var fieldsMeta = this.fieldsMeta;

      return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
        return !_this2.getFieldMeta(name).hidden;
      }) : [];
    }
  }, {
    key: 'getAllFieldsName',
    value: function getAllFieldsName() {
      var fieldsMeta = this.fieldsMeta;

      return fieldsMeta ? Object.keys(fieldsMeta) : [];
    }
  }, {
    key: 'getValidFieldsFullName',
    value: function getValidFieldsFullName(maybePartialName) {
      var maybePartialNames = Array.isArray(maybePartialName) ? maybePartialName : [maybePartialName];
      return this.getValidFieldsName().filter(function (fullName) {
        return maybePartialNames.some(function (partialName) {
          return fullName === partialName || (0, _utils.startsWith)(fullName, partialName) && ['.', '['].indexOf(fullName[partialName.length]) >= 0;
        });
      });
    }
  }, {
    key: 'getFieldValuePropValue',
    value: function getFieldValuePropValue(fieldMeta) {
      var name = fieldMeta.name,
          getValueProps = fieldMeta.getValueProps,
          valuePropName = fieldMeta.valuePropName;

      var field = this.getField(name);
      var fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;
      if (getValueProps) {
        return getValueProps(fieldValue);
      }
      return (0, _defineProperty3['default'])({}, valuePropName, fieldValue);
    }
  }, {
    key: 'getField',
    value: function getField(name) {
      return (0, _extends3['default'])({}, this.fields[name], {
        name: name
      });
    }
  }, {
    key: 'getNotCollectedFields',
    value: function getNotCollectedFields() {
      var _this3 = this;

      return this.getValidFieldsName().filter(function (name) {
        return !_this3.fields[name];
      }).map(function (name) {
        return {
          name: name,
          dirty: false,
          value: _this3.getFieldMeta(name).initialValue
        };
      }).reduce(function (acc, field) {
        return (0, _set2['default'])(acc, field.name, (0, _createFormField2['default'])(field));
      }, {});
    }
  }, {
    key: 'getNestedAllFields',
    value: function getNestedAllFields() {
      var _this4 = this;

      return Object.keys(this.fields).reduce(function (acc, name) {
        return (0, _set2['default'])(acc, name, (0, _createFormField2['default'])(_this4.fields[name]));
      }, this.getNotCollectedFields());
    }
  }, {
    key: 'getFieldMember',
    value: function getFieldMember(name, member) {
      return this.getField(name)[member];
    }
  }, {
    key: 'getNestedFields',
    value: function getNestedFields(names, getter) {
      var fields = names || this.getValidFieldsName();
      return fields.reduce(function (acc, f) {
        return (0, _set2['default'])(acc, f, getter(f));
      }, {});
    }
  }, {
    key: 'getNestedField',
    value: function getNestedField(name, getter) {
      var fullNames = this.getValidFieldsFullName(name);
      if (fullNames.length === 0 || // Not registered
      fullNames.length === 1 && fullNames[0] === name // Name already is full name.
      ) {
          return getter(name);
        }
      var isArrayValue = fullNames[0][name.length] === '[';
      var suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
      return fullNames.reduce(function (acc, fullName) {
        return (0, _set2['default'])(acc, fullName.slice(suffixNameStartIndex), getter(fullName));
      }, isArrayValue ? [] : {});
    }
  }, {
    key: 'isValidNestedFieldName',


    // @private
    // BG: `a` and `a.b` cannot be use in the same form
    value: function isValidNestedFieldName(name) {
      var names = this.getAllFieldsName();
      return names.every(function (n) {
        return !partOf(n, name) && !partOf(name, n);
      });
    }
  }, {
    key: 'clearField',
    value: function clearField(name) {
      delete this.fields[name];
      delete this.fieldsMeta[name];
    }
  }]);
  return FieldsStore;
}();

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.setFieldsInitialValue = function (initialValues) {
    var flattenedInitialValues = _this5.flattenRegisteredFields(initialValues);
    var fieldsMeta = _this5.fieldsMeta;
    Object.keys(flattenedInitialValues).forEach(function (name) {
      if (fieldsMeta[name]) {
        _this5.setFieldMeta(name, (0, _extends3['default'])({}, _this5.getFieldMeta(name), {
          initialValue: flattenedInitialValues[name]
        }));
      }
    });
  };

  this.getAllValues = function () {
    var fieldsMeta = _this5.fieldsMeta,
        fields = _this5.fields;

    return Object.keys(fieldsMeta).reduce(function (acc, name) {
      return (0, _set2['default'])(acc, name, _this5.getValueFromFields(name, fields));
    }, {});
  };

  this.getFieldsValue = function (names) {
    return _this5.getNestedFields(names, _this5.getFieldValue);
  };

  this.getFieldValue = function (name) {
    var fields = _this5.fields;

    return _this5.getNestedField(name, function (fullName) {
      return _this5.getValueFromFields(fullName, fields);
    });
  };

  this.getFieldsError = function (names) {
    return _this5.getNestedFields(names, _this5.getFieldError);
  };

  this.getFieldError = function (name) {
    return _this5.getNestedField(name, function (fullName) {
      return (0, _utils.getErrorStrs)(_this5.getFieldMember(fullName, 'errors'));
    });
  };

  this.isFieldValidating = function (name) {
    return _this5.getFieldMember(name, 'validating');
  };

  this.isFieldsValidating = function (ns) {
    var names = ns || _this5.getValidFieldsName();
    return names.some(function (n) {
      return _this5.isFieldValidating(n);
    });
  };

  this.isFieldTouched = function (name) {
    return _this5.getFieldMember(name, 'touched');
  };

  this.isFieldsTouched = function (ns) {
    var names = ns || _this5.getValidFieldsName();
    return names.some(function (n) {
      return _this5.isFieldTouched(n);
    });
  };
};

function createFieldsStore(fields) {
  return new FieldsStore(fields);
}
module.exports = exports['default'];

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixin = undefined;

var _createBaseForm = __webpack_require__(98);

var _createBaseForm2 = _interopRequireDefault(_createBaseForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var mixin = exports.mixin = {
  getForm: function getForm() {
    return {
      getFieldsValue: this.fieldsStore.getFieldsValue,
      getFieldValue: this.fieldsStore.getFieldValue,
      getFieldInstance: this.getFieldInstance,
      setFieldsValue: this.setFieldsValue,
      setFields: this.setFields,
      setFieldsInitialValue: this.fieldsStore.setFieldsInitialValue,
      getFieldDecorator: this.getFieldDecorator,
      getFieldProps: this.getFieldProps,
      getFieldsError: this.fieldsStore.getFieldsError,
      getFieldError: this.fieldsStore.getFieldError,
      isFieldValidating: this.fieldsStore.isFieldValidating,
      isFieldsValidating: this.fieldsStore.isFieldsValidating,
      isFieldsTouched: this.fieldsStore.isFieldsTouched,
      isFieldTouched: this.fieldsStore.isFieldTouched,
      isSubmitting: this.isSubmitting,
      submit: this.submit,
      validateFields: this.validateFields,
      resetFields: this.resetFields
    };
  }
};

function createForm(options) {
  return (0, _createBaseForm2['default'])(options, [mixin]);
}

exports['default'] = createForm;

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(10);

var ReactDOM = _interopRequireWildcard(_reactDom);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _rcAnimate = __webpack_require__(23);

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _PureRenderMixin = __webpack_require__(102);

var _PureRenderMixin2 = _interopRequireDefault(_PureRenderMixin);

var _row = __webpack_require__(134);

var _row2 = _interopRequireDefault(_row);

var _col = __webpack_require__(136);

var _col2 = _interopRequireDefault(_col);

var _warning = __webpack_require__(46);

var _warning2 = _interopRequireDefault(_warning);

var _constants = __webpack_require__(103);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FormItem = function (_React$Component) {
    (0, _inherits3['default'])(FormItem, _React$Component);

    function FormItem() {
        (0, _classCallCheck3['default'])(this, FormItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).apply(this, arguments));

        _this.state = { helpShow: false };
        _this.onHelpAnimEnd = function (_key, helpShow) {
            _this.setState({ helpShow: helpShow });
        };
        // Resolve duplicated ids bug between different forms
        // https://github.com/ant-design/ant-design/issues/7351
        _this.onLabelClick = function (e) {
            var label = _this.props.label;

            var id = _this.props.id || _this.getId();
            if (!id) {
                return;
            }
            var controls = document.querySelectorAll('[id="' + id + '"]');
            if (controls.length !== 1) {
                // Only prevent in default situation
                // Avoid preventing event in `label={<a href="xx">link</a>}``
                if (typeof label === 'string') {
                    e.preventDefault();
                }
                var control = ReactDOM.findDOMNode(_this).querySelector('[id="' + id + '"]');
                if (control && control.focus) {
                    control.focus();
                }
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(FormItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _warning2['default'])(this.getControls(this.props.children, true).length <= 1, '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' + 'while there are more than one `getFieldDecorator` in it.');
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return _PureRenderMixin2['default'].shouldComponentUpdate.apply(this, args);
        }
    }, {
        key: 'getHelpMsg',
        value: function getHelpMsg() {
            var props = this.props;
            var onlyControl = this.getOnlyControl();
            if (props.help === undefined && onlyControl) {
                var errors = this.getField().errors;
                return errors ? errors.map(function (e) {
                    return e.message;
                }).join(', ') : '';
            }
            return props.help;
        }
    }, {
        key: 'getControls',
        value: function getControls(children, recursively) {
            var controls = [];
            var childrenArray = React.Children.toArray(children);
            for (var i = 0; i < childrenArray.length; i++) {
                if (!recursively && controls.length > 0) {
                    break;
                }
                var child = childrenArray[i];
                if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
                    continue;
                }
                if (!child.props) {
                    continue;
                }
                if (_constants.FIELD_META_PROP in child.props) {
                    controls.push(child);
                } else if (child.props.children) {
                    controls = controls.concat(this.getControls(child.props.children, recursively));
                }
            }
            return controls;
        }
    }, {
        key: 'getOnlyControl',
        value: function getOnlyControl() {
            var child = this.getControls(this.props.children, false)[0];
            return child !== undefined ? child : null;
        }
    }, {
        key: 'getChildProp',
        value: function getChildProp(prop) {
            var child = this.getOnlyControl();
            return child && child.props && child.props[prop];
        }
    }, {
        key: 'getId',
        value: function getId() {
            return this.getChildProp('id');
        }
    }, {
        key: 'getMeta',
        value: function getMeta() {
            return this.getChildProp(_constants.FIELD_META_PROP);
        }
    }, {
        key: 'getField',
        value: function getField() {
            return this.getChildProp(_constants.FIELD_DATA_PROP);
        }
    }, {
        key: 'renderHelp',
        value: function renderHelp() {
            var prefixCls = this.props.prefixCls;
            var help = this.getHelpMsg();
            var children = help ? React.createElement(
                'div',
                { className: prefixCls + '-explain', key: 'help' },
                help
            ) : null;
            return React.createElement(
                _rcAnimate2['default'],
                { transitionName: 'show-help', component: '', transitionAppear: true, key: 'help', onEnd: this.onHelpAnimEnd },
                children
            );
        }
    }, {
        key: 'renderExtra',
        value: function renderExtra() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                extra = _props.extra;

            return extra ? React.createElement(
                'div',
                { className: prefixCls + '-extra' },
                extra
            ) : null;
        }
    }, {
        key: 'getValidateStatus',
        value: function getValidateStatus() {
            var onlyControl = this.getOnlyControl();
            if (!onlyControl) {
                return '';
            }
            var field = this.getField();
            if (field.validating) {
                return 'validating';
            }
            if (field.errors) {
                return 'error';
            }
            var fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;
            if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                return 'success';
            }
            return '';
        }
    }, {
        key: 'renderValidateWrapper',
        value: function renderValidateWrapper(c1, c2, c3) {
            var props = this.props;
            var onlyControl = this.getOnlyControl;
            var validateStatus = props.validateStatus === undefined && onlyControl ? this.getValidateStatus() : props.validateStatus;
            var classes = this.props.prefixCls + '-item-control';
            if (validateStatus) {
                classes = (0, _classnames2['default'])(this.props.prefixCls + '-item-control', {
                    'has-feedback': props.hasFeedback || validateStatus === 'validating',
                    'has-success': validateStatus === 'success',
                    'has-warning': validateStatus === 'warning',
                    'has-error': validateStatus === 'error',
                    'is-validating': validateStatus === 'validating'
                });
            }
            return React.createElement(
                'div',
                { className: classes },
                React.createElement(
                    'span',
                    { className: this.props.prefixCls + '-item-children' },
                    c1
                ),
                c2,
                c3
            );
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper(children) {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                wrapperCol = _props2.wrapperCol;

            var className = (0, _classnames2['default'])(prefixCls + '-item-control-wrapper', wrapperCol && wrapperCol.className);
            return React.createElement(
                _col2['default'],
                (0, _extends3['default'])({}, wrapperCol, { className: className, key: 'wrapper' }),
                children
            );
        }
    }, {
        key: 'isRequired',
        value: function isRequired() {
            var required = this.props.required;

            if (required !== undefined) {
                return required;
            }
            if (this.getOnlyControl()) {
                var meta = this.getMeta() || {};
                var validate = meta.validate || [];
                return validate.filter(function (item) {
                    return !!item.rules;
                }).some(function (item) {
                    return item.rules.some(function (rule) {
                        return rule.required;
                    });
                });
            }
            return false;
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            var _props3 = this.props,
                prefixCls = _props3.prefixCls,
                label = _props3.label,
                labelCol = _props3.labelCol,
                colon = _props3.colon,
                id = _props3.id;

            var context = this.context;
            var required = this.isRequired();
            var labelColClassName = (0, _classnames2['default'])(prefixCls + '-item-label', labelCol && labelCol.className);
            var labelClassName = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-item-required', required));
            var labelChildren = label;
            // Keep label is original where there should have no colon
            var haveColon = colon && !context.vertical;
            // Remove duplicated user input colon
            if (haveColon && typeof label === 'string' && label.trim() !== '') {
                labelChildren = label.replace(/[：|:]\s*$/, '');
            }
            return label ? React.createElement(
                _col2['default'],
                (0, _extends3['default'])({}, labelCol, { className: labelColClassName, key: 'label' }),
                React.createElement(
                    'label',
                    { htmlFor: id || this.getId(), className: labelClassName, title: typeof label === 'string' ? label : '', onClick: this.onLabelClick },
                    labelChildren
                )
            ) : null;
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var children = this.props.children;

            return [this.renderLabel(), this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), this.renderExtra()))];
        }
    }, {
        key: 'renderFormItem',
        value: function renderFormItem(children) {
            var _itemClassName;

            var props = this.props;
            var prefixCls = props.prefixCls;
            var style = props.style;
            var itemClassName = (_itemClassName = {}, (0, _defineProperty3['default'])(_itemClassName, prefixCls + '-item', true), (0, _defineProperty3['default'])(_itemClassName, prefixCls + '-item-with-help', !!this.getHelpMsg() || this.state.helpShow), (0, _defineProperty3['default'])(_itemClassName, prefixCls + '-item-no-colon', !props.colon), (0, _defineProperty3['default'])(_itemClassName, '' + props.className, !!props.className), _itemClassName);
            return React.createElement(
                _row2['default'],
                { className: (0, _classnames2['default'])(itemClassName), style: style },
                children
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.renderChildren();
            return this.renderFormItem(children);
        }
    }]);
    return FormItem;
}(React.Component);

exports['default'] = FormItem;

FormItem.defaultProps = {
    hasFeedback: false,
    prefixCls: 'ant-form',
    colon: true
};
FormItem.propTypes = {
    prefixCls: _propTypes2['default'].string,
    label: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].node]),
    labelCol: _propTypes2['default'].object,
    help: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].bool]),
    validateStatus: _propTypes2['default'].oneOf(['', 'success', 'warning', 'error', 'validating']),
    hasFeedback: _propTypes2['default'].bool,
    wrapperCol: _propTypes2['default'].object,
    className: _propTypes2['default'].string,
    id: _propTypes2['default'].string,
    children: _propTypes2['default'].node,
    colon: _propTypes2['default'].bool
};
FormItem.contextTypes = {
    vertical: _propTypes2['default'].bool
};
module.exports = exports['default'];

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 198:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 199:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

__webpack_require__(138);

/***/ }),

/***/ 202:
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = __webpack_require__(158);

var _button2 = _interopRequireDefault(_button);

var _buttonGroup = __webpack_require__(175);

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_button2['default'].Group = _buttonGroup2['default'];
exports['default'] = _button2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

__webpack_require__(198);

__webpack_require__(43);

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

__webpack_require__(197);

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _warning = __webpack_require__(28);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var warned = {};

exports['default'] = function (valid, message) {
    if (!valid && !warned[message]) {
        (0, _warning2['default'])(false, message);
        warned[message] = true;
    }
};

module.exports = exports['default'];

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Input = __webpack_require__(93);

var _Input2 = _interopRequireDefault(_Input);

var _Group = __webpack_require__(176);

var _Group2 = _interopRequireDefault(_Group);

var _Search = __webpack_require__(177);

var _Search2 = _interopRequireDefault(_Search);

var _TextArea = __webpack_require__(178);

var _TextArea2 = _interopRequireDefault(_TextArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Input2['default'].Group = _Group2['default'];
_Input2['default'].Search = _Search2['default'];
_Input2['default'].TextArea = _TextArea2['default'];
exports['default'] = _Input2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(10);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _LoginForm = __webpack_require__(584);

var _LoginForm2 = _interopRequireDefault(_LoginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_LoginForm2.default, null), document.getElementById("app"));

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _button = __webpack_require__(32);

var _button2 = _interopRequireDefault(_button);

var _icon = __webpack_require__(17);

var _icon2 = _interopRequireDefault(_icon);

var _input = __webpack_require__(55);

var _input2 = _interopRequireDefault(_input);

var _message2 = __webpack_require__(125);

var _message3 = _interopRequireDefault(_message2);

var _form = __webpack_require__(94);

var _form2 = _interopRequireDefault(_form);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(43);

__webpack_require__(47);

__webpack_require__(33);

__webpack_require__(137);

__webpack_require__(104);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = __webpack_require__(105);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

__webpack_require__(695);

var _conifg = __webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _form2.default.Item;

var NormalLoginForm = function (_Component) {
    _inherits(NormalLoginForm, _Component);

    function NormalLoginForm() {
        _classCallCheck(this, NormalLoginForm);

        var _this = _possibleConstructorReturn(this, (NormalLoginForm.__proto__ || Object.getPrototypeOf(NormalLoginForm)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.sendEmail = _this.sendEmail.bind(_this);
        _this.state = {
            isLogin: true,
            time: 10
        };
        return _this;
    }

    _createClass(NormalLoginForm, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            this.props.form.validateFields(function (err, values) {
                var server = _conifg.CONFIG.server;

                var url = server + "/login";
                if (!err) {
                    (0, _isomorphicFetch2.default)(url, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),
                        mode: 'cors',
                        credentials: 'include'
                    }).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        if (data.status === "success") {
                            location.href = "home.html";
                        } else {
                            _message3.default.error(data.msg);
                        }
                    });
                }
            });
        }
    }, {
        key: 'sendEmail',
        value: function sendEmail() {
            var _this2 = this;

            console.log(1);
            var temp = setInterval(function () {
                if (_this2.state.time === 0) {
                    clearInterval(temp);
                    _this2.setState({
                        time: 10
                    });
                } else {
                    _this2.setState({
                        time: _this2.state.time - 1
                    });
                }
            }, 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var getFieldDecorator = this.props.form.getFieldDecorator;

            var Search = _input2.default.Search;
            return _react2.default.createElement(
                _form2.default,
                { onSubmit: this.handleSubmit, className: 'login-form' },
                _react2.default.createElement(
                    'h1',
                    null,
                    this.state.isLogin ? '登录' : '注册'
                ),
                _react2.default.createElement(
                    FormItem,
                    null,
                    getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your UserName!' }]
                    })(_react2.default.createElement(_input2.default, { prefix: _react2.default.createElement(_icon2.default, { type: 'user', style: { color: 'rgba(0,0,0,.25)' } }), placeholder: 'username' }))
                ),
                _react2.default.createElement(
                    FormItem,
                    null,
                    getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }]
                    })(_react2.default.createElement(_input2.default, { prefix: _react2.default.createElement(_icon2.default, { type: 'lock', style: { color: 'rgba(0,0,0,.25)' } }), type: 'password', placeholder: 'Password' }))
                ),
                !this.state.isLogin && _react2.default.createElement(
                    FormItem,
                    null,
                    getFieldDecorator('Email', {
                        rules: [{ required: true, message: 'Please input your Email!' }]
                    })(_react2.default.createElement(Search, { prefix: _react2.default.createElement(_icon2.default, { type: 'mail', style: { color: 'rgba(0,0,0,.25)' } }),
                        placeholder: 'Email',
                        enterButton: this.state.time === 10 ? '发送邮件' : this.state.time + 's',
                        onSearch: this.state.time === 10 ? this.sendEmail : null
                    }))
                ),
                !this.state.isLogin && _react2.default.createElement(
                    FormItem,
                    null,
                    getFieldDecorator(' Verification Code', {
                        rules: [{ required: true, message: 'Please input your Verification Code!' }]
                    })(_react2.default.createElement(_input2.default, { prefix: _react2.default.createElement(_icon2.default, { type: 'question-circle-o', style: { color: 'rgba(0,0,0,.25)' } }), placeholder: 'Verification Code' }))
                ),
                _react2.default.createElement(
                    FormItem,
                    null,
                    _react2.default.createElement(
                        _button2.default,
                        { type: 'primary', htmlType: 'submit', className: 'login-form-button' },
                        this.state.isLogin ? 'Login' : 'Register'
                    ),
                    'Or ',
                    _react2.default.createElement(
                        'a',
                        { href: '#', onClick: function onClick() {
                                return _this3.setState({ isLogin: !_this3.state.isLogin });
                            } },
                        this.state.isLogin ? 'register now!' : 'Login now!'
                    )
                )
            );
        }
    }]);

    return NormalLoginForm;
}(_react.Component);

var WrappedNormalLoginForm = _form2.default.create()(NormalLoginForm);

exports.default = WrappedNormalLoginForm;

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = __webpack_require__(21);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.argumentContainer = argumentContainer;
exports.identity = identity;
exports.flattenArray = flattenArray;
exports.treeTraverse = treeTraverse;
exports.flattenFields = flattenFields;
exports.normalizeValidateRules = normalizeValidateRules;
exports.getValidateTriggers = getValidateTriggers;
exports.getValueFromEvent = getValueFromEvent;
exports.getErrorStrs = getErrorStrs;
exports.getParams = getParams;
exports.isEmptyObject = isEmptyObject;
exports.hasRules = hasRules;
exports.startsWith = startsWith;

var _hoistNonReactStatics = __webpack_require__(101);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
}

function argumentContainer(Container, WrappedComponent) {
  /* eslint no-param-reassign:0 */
  Container.displayName = 'Form(' + getDisplayName(WrappedComponent) + ')';
  Container.WrappedComponent = WrappedComponent;
  return (0, _hoistNonReactStatics2['default'])(Container, WrappedComponent);
}

function identity(obj) {
  return obj;
}

function flattenArray(arr) {
  return Array.prototype.concat.apply([], arr);
}

function treeTraverse() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var tree = arguments[1];
  var isLeafNode = arguments[2];
  var errorMessage = arguments[3];
  var callback = arguments[4];

  if (isLeafNode(path, tree)) {
    callback(path, tree);
  } else if (tree === undefined) {
    return;
  } else if (Array.isArray(tree)) {
    tree.forEach(function (subTree, index) {
      return treeTraverse(path + '[' + index + ']', subTree, isLeafNode, errorMessage, callback);
    });
  } else {
    // It's object and not a leaf node
    if ((typeof tree === 'undefined' ? 'undefined' : (0, _typeof3['default'])(tree)) !== 'object') {
      console.error(errorMessage);
      return;
    }
    Object.keys(tree).forEach(function (subTreeKey) {
      var subTree = tree[subTreeKey];
      treeTraverse('' + path + (path ? '.' : '') + subTreeKey, subTree, isLeafNode, errorMessage, callback);
    });
  }
}

function flattenFields(maybeNestedFields, isLeafNode, errorMessage) {
  var fields = {};
  treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, function (path, node) {
    fields[path] = node;
  });
  return fields;
}

function normalizeValidateRules(validate, rules, validateTrigger) {
  var validateRules = validate.map(function (item) {
    var newItem = (0, _extends3['default'])({}, item, {
      trigger: item.trigger || []
    });
    if (typeof newItem.trigger === 'string') {
      newItem.trigger = [newItem.trigger];
    }
    return newItem;
  });
  if (rules) {
    validateRules.push({
      trigger: validateTrigger ? [].concat(validateTrigger) : [],
      rules: rules
    });
  }
  return validateRules;
}

function getValidateTriggers(validateRules) {
  return validateRules.filter(function (item) {
    return !!item.rules && item.rules.length;
  }).map(function (item) {
    return item.trigger;
  }).reduce(function (pre, curr) {
    return pre.concat(curr);
  }, []);
}

function getValueFromEvent(e) {
  // To support custom element
  if (!e || !e.target) {
    return e;
  }
  var target = e.target;

  return target.type === 'checkbox' ? target.checked : target.value;
}

function getErrorStrs(errors) {
  if (errors) {
    return errors.map(function (e) {
      if (e && e.message) {
        return e.message;
      }
      return e;
    });
  }
  return errors;
}

function getParams(ns, opt, cb) {
  var names = ns;
  var options = opt;
  var callback = cb;
  if (cb === undefined) {
    if (typeof names === 'function') {
      callback = names;
      options = {};
      names = undefined;
    } else if (Array.isArray(names)) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
    } else {
      callback = options;
      options = names || {};
      names = undefined;
    }
  }
  return {
    names: names,
    options: options,
    callback: callback
  };
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function hasRules(validate) {
  if (validate) {
    return validate.some(function (item) {
      return item.rules && item.rules.length;
    });
  }
  return false;
}

function startsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
}

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var CONFIG = exports.CONFIG = {
    server: 'http://172.29.108.123:8080/sign/v1'
};

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = __webpack_require__(15);

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var Input = function (_React$Component) {
    (0, _inherits3['default'])(Input, _React$Component);

    function Input() {
        (0, _classCallCheck3['default'])(this, Input);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

        _this.handleKeyDown = function (e) {
            var _this$props = _this.props,
                onPressEnter = _this$props.onPressEnter,
                onKeyDown = _this$props.onKeyDown;

            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        return _this;
    }

    (0, _createClass3['default'])(Input, [{
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }
    }, {
        key: 'getInputClassName',
        value: function getInputClassName() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                size = _props.size,
                disabled = _props.disabled;

            return (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === 'small'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === 'large'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), _classNames));
        }
    }, {
        key: 'renderLabeledInput',
        value: function renderLabeledInput(children) {
            var _classNames3;

            var props = this.props;
            // Not wrap when there is not addons
            if (!props.addonBefore && !props.addonAfter) {
                return children;
            }
            var wrapperClassName = props.prefixCls + '-group';
            var addonClassName = wrapperClassName + '-addon';
            var addonBefore = props.addonBefore ? React.createElement(
                'span',
                { className: addonClassName },
                props.addonBefore
            ) : null;
            var addonAfter = props.addonAfter ? React.createElement(
                'span',
                { className: addonClassName },
                props.addonAfter
            ) : null;
            var className = (0, _classnames2['default'])(props.prefixCls + '-wrapper', (0, _defineProperty3['default'])({}, wrapperClassName, addonBefore || addonAfter));
            var groupClassName = (0, _classnames2['default'])(props.prefixCls + '-group-wrapper', (_classNames3 = {}, (0, _defineProperty3['default'])(_classNames3, props.prefixCls + '-group-wrapper-sm', props.size === 'small'), (0, _defineProperty3['default'])(_classNames3, props.prefixCls + '-group-wrapper-lg', props.size === 'large'), _classNames3));
            // Need another wrapper for changing display:table to display:inline-block
            // and put style prop in wrapper
            if (addonBefore || addonAfter) {
                return React.createElement(
                    'span',
                    { className: groupClassName, style: props.style },
                    React.createElement(
                        'span',
                        { className: className },
                        addonBefore,
                        React.cloneElement(children, { style: null }),
                        addonAfter
                    )
                );
            }
            return React.createElement(
                'span',
                { className: className },
                addonBefore,
                children,
                addonAfter
            );
        }
    }, {
        key: 'renderLabeledIcon',
        value: function renderLabeledIcon(children) {
            var _classNames4;

            var props = this.props;

            if (!('prefix' in props || 'suffix' in props)) {
                return children;
            }
            var prefix = props.prefix ? React.createElement(
                'span',
                { className: props.prefixCls + '-prefix' },
                props.prefix
            ) : null;
            var suffix = props.suffix ? React.createElement(
                'span',
                { className: props.prefixCls + '-suffix' },
                props.suffix
            ) : null;
            var affixWrapperCls = (0, _classnames2['default'])(props.className, props.prefixCls + '-affix-wrapper', (_classNames4 = {}, (0, _defineProperty3['default'])(_classNames4, props.prefixCls + '-affix-wrapper-sm', props.size === 'small'), (0, _defineProperty3['default'])(_classNames4, props.prefixCls + '-affix-wrapper-lg', props.size === 'large'), _classNames4));
            return React.createElement(
                'span',
                { className: affixWrapperCls, style: props.style },
                prefix,
                React.cloneElement(children, { style: null, className: this.getInputClassName() }),
                suffix
            );
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _props2 = this.props,
                value = _props2.value,
                className = _props2.className;
            // Fix https://fb.me/react-unknown-prop

            var otherProps = (0, _omit2['default'])(this.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix']);
            if ('value' in this.props) {
                otherProps.value = fixControlledValue(value);
                // Input elements must be either controlled or uncontrolled,
                // specify either the value prop, or the defaultValue prop, but not both.
                delete otherProps.defaultValue;
            }
            return this.renderLabeledIcon(React.createElement('input', (0, _extends3['default'])({}, otherProps, { className: (0, _classnames2['default'])(this.getInputClassName(), className), onKeyDown: this.handleKeyDown, ref: this.saveInput })));
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderLabeledInput(this.renderInput());
        }
    }]);
    return Input;
}(React.Component);

exports['default'] = Input;

Input.defaultProps = {
    prefixCls: 'ant-input',
    type: 'text',
    disabled: false
};
Input.propTypes = {
    type: _propTypes2['default'].string,
    id: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    size: _propTypes2['default'].oneOf(['small', 'default', 'large']),
    maxLength: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    disabled: _propTypes2['default'].bool,
    value: _propTypes2['default'].any,
    defaultValue: _propTypes2['default'].any,
    className: _propTypes2['default'].string,
    addonBefore: _propTypes2['default'].node,
    addonAfter: _propTypes2['default'].node,
    prefixCls: _propTypes2['default'].string,
    autosize: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
    onPressEnter: _propTypes2['default'].func,
    onKeyDown: _propTypes2['default'].func,
    onKeyUp: _propTypes2['default'].func,
    onFocus: _propTypes2['default'].func,
    onBlur: _propTypes2['default'].func,
    prefix: _propTypes2['default'].node,
    suffix: _propTypes2['default'].node
};
module.exports = exports['default'];

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Form = __webpack_require__(182);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _Form2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = __webpack_require__(22);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(1);

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__(42);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _createReactClass = __webpack_require__(14);

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _asyncValidator = __webpack_require__(191);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _warning = __webpack_require__(28);

var _warning2 = _interopRequireDefault(_warning);

var _get = __webpack_require__(99);

var _get2 = _interopRequireDefault(_get);

var _has = __webpack_require__(77);

var _has2 = _interopRequireDefault(_has);

var _set = __webpack_require__(78);

var _set2 = _interopRequireDefault(_set);

var _createFieldsStore = __webpack_require__(193);

var _createFieldsStore2 = _interopRequireDefault(_createFieldsStore);

var _utils = __webpack_require__(66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULT_TRIGGER = 'onChange';

function createBaseForm() {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mixins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var validateMessages = option.validateMessages,
      onFieldsChange = option.onFieldsChange,
      onValuesChange = option.onValuesChange,
      _option$mapProps = option.mapProps,
      mapProps = _option$mapProps === undefined ? _utils.identity : _option$mapProps,
      mapPropsToFields = option.mapPropsToFields,
      fieldNameProp = option.fieldNameProp,
      fieldMetaProp = option.fieldMetaProp,
      fieldDataProp = option.fieldDataProp,
      _option$formPropName = option.formPropName,
      formPropName = _option$formPropName === undefined ? 'form' : _option$formPropName,
      withRef = option.withRef;


  return function decorate(WrappedComponent) {
    var Form = (0, _createReactClass2['default'])({
      displayName: 'Form',

      mixins: mixins,

      getInitialState: function getInitialState() {
        var _this = this;

        var fields = mapPropsToFields && mapPropsToFields(this.props);
        this.fieldsStore = (0, _createFieldsStore2['default'])(fields || {});

        this.instances = {};
        this.cachedBind = {};
        this.clearedFieldMetaCache = {};
        // HACK: https://github.com/ant-design/ant-design/issues/6406
        ['getFieldsValue', 'getFieldValue', 'setFieldsInitialValue', 'getFieldsError', 'getFieldError', 'isFieldValidating', 'isFieldsValidating', 'isFieldsTouched', 'isFieldTouched'].forEach(function (key) {
          return _this[key] = function () {
            var _fieldsStore;

            if (process.env.NODE_ENV !== 'production') {
              (0, _warning2['default'])(false, 'you should not use `ref` on enhanced form, please use `wrappedComponentRef`. ' + 'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
            }
            return (_fieldsStore = _this.fieldsStore)[key].apply(_fieldsStore, arguments);
          };
        });

        return {
          submitting: false
        };
      },
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (mapPropsToFields) {
          this.fieldsStore.updateFields(mapPropsToFields(nextProps));
        }
      },
      onCollectCommon: function onCollectCommon(name, action, args) {
        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta[action]) {
          fieldMeta[action].apply(fieldMeta, (0, _toConsumableArray3['default'])(args));
        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
          var _fieldMeta$originalPr;

          (_fieldMeta$originalPr = fieldMeta.originalProps)[action].apply(_fieldMeta$originalPr, (0, _toConsumableArray3['default'])(args));
        }
        var value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent.apply(fieldMeta, (0, _toConsumableArray3['default'])(args)) : _utils.getValueFromEvent.apply(undefined, (0, _toConsumableArray3['default'])(args));
        if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
          var valuesAll = this.fieldsStore.getAllValues();
          var valuesAllSet = {};
          valuesAll[name] = value;
          Object.keys(valuesAll).forEach(function (key) {
            return (0, _set2['default'])(valuesAllSet, key, valuesAll[key]);
          });
          onValuesChange(this.props, (0, _set2['default'])({}, name, value), valuesAllSet);
        }
        var field = this.fieldsStore.getField(name);
        return { name: name, field: (0, _extends3['default'])({}, field, { value: value, touched: true }), fieldMeta: fieldMeta };
      },
      onCollect: function onCollect(name_, action) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var _onCollectCommon = this.onCollectCommon(name_, action, args),
            name = _onCollectCommon.name,
            field = _onCollectCommon.field,
            fieldMeta = _onCollectCommon.fieldMeta;

        var validate = fieldMeta.validate;

        var newField = (0, _extends3['default'])({}, field, {
          dirty: (0, _utils.hasRules)(validate)
        });
        this.setFields((0, _defineProperty3['default'])({}, name, newField));
      },
      onCollectValidate: function onCollectValidate(name_, action) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var _onCollectCommon2 = this.onCollectCommon(name_, action, args),
            field = _onCollectCommon2.field,
            fieldMeta = _onCollectCommon2.fieldMeta;

        var newField = (0, _extends3['default'])({}, field, {
          dirty: true
        });
        this.validateFieldsInternal([newField], {
          action: action,
          options: {
            firstFields: !!fieldMeta.validateFirst
          }
        });
      },
      getCacheBind: function getCacheBind(name, action, fn) {
        if (!this.cachedBind[name]) {
          this.cachedBind[name] = {};
        }
        var cache = this.cachedBind[name];
        if (!cache[action]) {
          cache[action] = fn.bind(this, name, action);
        }
        return cache[action];
      },
      recoverClearedField: function recoverClearedField(name) {
        if (this.clearedFieldMetaCache[name]) {
          this.fieldsStore.setFields((0, _defineProperty3['default'])({}, name, this.clearedFieldMetaCache[name].field));
          this.fieldsStore.setFieldMeta(name, this.clearedFieldMetaCache[name].meta);
          delete this.clearedFieldMetaCache[name];
        }
      },
      getFieldDecorator: function getFieldDecorator(name, fieldOption) {
        var _this2 = this;

        var props = this.getFieldProps(name, fieldOption);
        return function (fieldElem) {
          var fieldMeta = _this2.fieldsStore.getFieldMeta(name);
          var originalProps = fieldElem.props;
          if (process.env.NODE_ENV !== 'production') {
            var valuePropName = fieldMeta.valuePropName;
            (0, _warning2['default'])(!(valuePropName in originalProps), '`getFieldDecorator` will override `' + valuePropName + '`, ' + ('so please don\'t set `' + valuePropName + '` directly ') + 'and use `setFieldsValue` to set it.');
            var defaultValuePropName = 'default' + valuePropName[0].toUpperCase() + valuePropName.slice(1);
            (0, _warning2['default'])(!(defaultValuePropName in originalProps), '`' + defaultValuePropName + '` is invalid ' + ('for `getFieldDecorator` will set `' + valuePropName + '`,') + ' please use `option.initialValue` instead.');
          }
          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;
          return _react2['default'].cloneElement(fieldElem, (0, _extends3['default'])({}, props, _this2.fieldsStore.getFieldValuePropValue(fieldMeta)));
        };
      },
      getFieldProps: function getFieldProps(name) {
        var _this3 = this;

        var usersFieldOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!name) {
          throw new Error('Must call `getFieldProps` with valid name string!');
        }
        if (process.env.NODE_ENV !== 'production') {
          (0, _warning2['default'])(this.fieldsStore.isValidNestedFieldName(name), 'One field name cannot be part of another, e.g. `a` and `a.b`.');
          (0, _warning2['default'])(!('exclusive' in usersFieldOption), '`option.exclusive` of `getFieldProps`|`getFieldDecorator` had been remove.');
        }

        delete this.clearedFieldMetaCache[name];

        var fieldOption = (0, _extends3['default'])({
          name: name,
          trigger: DEFAULT_TRIGGER,
          valuePropName: 'value',
          validate: []
        }, usersFieldOption);

        var rules = fieldOption.rules,
            trigger = fieldOption.trigger,
            _fieldOption$validate = fieldOption.validateTrigger,
            validateTrigger = _fieldOption$validate === undefined ? trigger : _fieldOption$validate,
            validate = fieldOption.validate;


        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        if ('initialValue' in fieldOption) {
          fieldMeta.initialValue = fieldOption.initialValue;
        }

        var inputProps = (0, _extends3['default'])({}, this.fieldsStore.getFieldValuePropValue(fieldOption), {
          ref: this.getCacheBind(name, name + '__ref', this.saveRef)
        });
        if (fieldNameProp) {
          inputProps[fieldNameProp] = name;
        }

        var validateRules = (0, _utils.normalizeValidateRules)(validate, rules, validateTrigger);
        var validateTriggers = (0, _utils.getValidateTriggers)(validateRules);
        validateTriggers.forEach(function (action) {
          if (inputProps[action]) return;
          inputProps[action] = _this3.getCacheBind(name, action, _this3.onCollectValidate);
        });

        // make sure that the value will be collect
        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
        }

        var meta = (0, _extends3['default'])({}, fieldMeta, fieldOption, {
          validate: validateRules
        });
        this.fieldsStore.setFieldMeta(name, meta);
        if (fieldMetaProp) {
          inputProps[fieldMetaProp] = meta;
        }

        if (fieldDataProp) {
          inputProps[fieldDataProp] = this.fieldsStore.getField(name);
        }

        return inputProps;
      },
      getFieldInstance: function getFieldInstance(name) {
        return this.instances[name];
      },
      getRules: function getRules(fieldMeta, action) {
        var actionRules = fieldMeta.validate.filter(function (item) {
          return !action || item.trigger.indexOf(action) >= 0;
        }).map(function (item) {
          return item.rules;
        });
        return (0, _utils.flattenArray)(actionRules);
      },
      setFields: function setFields(maybeNestedFields) {
        var _this4 = this;

        var fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
        this.fieldsStore.setFields(fields);
        if (onFieldsChange) {
          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return (0, _set2['default'])(acc, name, _this4.fieldsStore.getField(name));
          }, {});
          onFieldsChange(this.props, changedFields, this.fieldsStore.getNestedAllFields());
        }
        this.forceUpdate();
      },
      resetFields: function resetFields(ns) {
        var _this5 = this;

        var newFields = this.fieldsStore.resetFields(ns);
        if (Object.keys(newFields).length > 0) {
          this.setFields(newFields);
        }
        if (ns) {
          var names = Array.isArray(ns) ? ns : [ns];
          names.forEach(function (name) {
            return delete _this5.clearedFieldMetaCache[name];
          });
        } else {
          this.clearedFieldMetaCache = {};
        }
      },
      setFieldsValue: function setFieldsValue(changedValues) {
        var fieldsMeta = this.fieldsStore.fieldsMeta;

        var values = this.fieldsStore.flattenRegisteredFields(changedValues);
        var newFields = Object.keys(values).reduce(function (acc, name) {
          var isRegistered = fieldsMeta[name];
          if (process.env.NODE_ENV !== 'production') {
            (0, _warning2['default'])(isRegistered, 'Cannot use `setFieldsValue` until ' + 'you use `getFieldDecorator` or `getFieldProps` to register it.');
          }
          if (isRegistered) {
            var value = values[name];
            acc[name] = {
              value: value
            };
          }
          return acc;
        }, {});
        this.setFields(newFields);
        if (onValuesChange) {
          var allValues = this.fieldsStore.getAllValues();
          onValuesChange(this.props, changedValues, allValues);
        }
      },
      saveRef: function saveRef(name, _, component) {
        if (!component) {
          // after destroy, delete data
          this.clearedFieldMetaCache[name] = {
            field: this.fieldsStore.getField(name),
            meta: this.fieldsStore.getFieldMeta(name)
          };
          this.fieldsStore.clearField(name);
          delete this.instances[name];
          delete this.cachedBind[name];
          return;
        }
        this.recoverClearedField(name);
        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta) {
          var ref = fieldMeta.ref;
          if (ref) {
            if (typeof ref === 'string') {
              throw new Error('can not set ref string for ' + name);
            }
            ref(component);
          }
        }
        this.instances[name] = component;
      },
      validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
        var _this6 = this;

        var fieldNames = _ref.fieldNames,
            action = _ref.action,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? {} : _ref$options;

        var allRules = {};
        var allValues = {};
        var allFields = {};
        var alreadyErrors = {};
        fields.forEach(function (field) {
          var name = field.name;
          if (options.force !== true && field.dirty === false) {
            if (field.errors) {
              (0, _set2['default'])(alreadyErrors, name, { errors: field.errors });
            }
            return;
          }
          var fieldMeta = _this6.fieldsStore.getFieldMeta(name);
          var newField = (0, _extends3['default'])({}, field);
          newField.errors = undefined;
          newField.validating = true;
          newField.dirty = true;
          allRules[name] = _this6.getRules(fieldMeta, action);
          allValues[name] = newField.value;
          allFields[name] = newField;
        });
        this.setFields(allFields);
        // in case normalize
        Object.keys(allValues).forEach(function (f) {
          allValues[f] = _this6.fieldsStore.getFieldValue(f);
        });
        if (callback && (0, _utils.isEmptyObject)(allFields)) {
          callback((0, _utils.isEmptyObject)(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue(fieldNames));
          return;
        }
        var validator = new _asyncValidator2['default'](allRules);
        if (validateMessages) {
          validator.messages(validateMessages);
        }
        validator.validate(allValues, options, function (errors) {
          var errorsGroup = (0, _extends3['default'])({}, alreadyErrors);
          if (errors && errors.length) {
            errors.forEach(function (e) {
              var fieldName = e.field;
              if (!(0, _has2['default'])(errorsGroup, fieldName)) {
                (0, _set2['default'])(errorsGroup, fieldName, { errors: [] });
              }
              var fieldErrors = (0, _get2['default'])(errorsGroup, fieldName.concat('.errors'));
              fieldErrors.push(e);
            });
          }
          var expired = [];
          var nowAllFields = {};
          Object.keys(allRules).forEach(function (name) {
            var fieldErrors = (0, _get2['default'])(errorsGroup, name);
            var nowField = _this6.fieldsStore.getField(name);
            // avoid concurrency problems
            if (nowField.value !== allValues[name]) {
              expired.push({
                name: name
              });
            } else {
              nowField.errors = fieldErrors && fieldErrors.errors;
              nowField.value = allValues[name];
              nowField.validating = false;
              nowField.dirty = false;
              nowAllFields[name] = nowField;
            }
          });
          _this6.setFields(nowAllFields);
          if (callback) {
            if (expired.length) {
              expired.forEach(function (_ref2) {
                var name = _ref2.name;

                var fieldErrors = [{
                  message: name + ' need to revalidate',
                  field: name
                }];
                (0, _set2['default'])(errorsGroup, name, {
                  expired: true,
                  errors: fieldErrors
                });
              });
            }

            callback((0, _utils.isEmptyObject)(errorsGroup) ? null : errorsGroup, _this6.fieldsStore.getFieldsValue(fieldNames));
          }
        });
      },
      validateFields: function validateFields(ns, opt, cb) {
        var _this7 = this;

        var _getParams = (0, _utils.getParams)(ns, opt, cb),
            names = _getParams.names,
            callback = _getParams.callback,
            options = _getParams.options;

        var fieldNames = names ? this.fieldsStore.getValidFieldsFullName(names) : this.fieldsStore.getValidFieldsName();
        var fields = fieldNames.filter(function (name) {
          var fieldMeta = _this7.fieldsStore.getFieldMeta(name);
          return (0, _utils.hasRules)(fieldMeta.validate);
        }).map(function (name) {
          var field = _this7.fieldsStore.getField(name);
          field.value = _this7.fieldsStore.getFieldValue(name);
          return field;
        });
        if (!fields.length) {
          if (callback) {
            callback(null, this.fieldsStore.getFieldsValue(fieldNames));
          }
          return;
        }
        if (!('firstFields' in options)) {
          options.firstFields = fieldNames.filter(function (name) {
            var fieldMeta = _this7.fieldsStore.getFieldMeta(name);
            return !!fieldMeta.validateFirst;
          });
        }
        this.validateFieldsInternal(fields, {
          fieldNames: fieldNames,
          options: options
        }, callback);
      },
      isSubmitting: function isSubmitting() {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          (0, _warning2['default'])(false, '`isSubmitting` is deprecated. ' + 'Actually, it\'s more convenient to handle submitting status by yourself.');
        }
        return this.state.submitting;
      },
      submit: function submit(callback) {
        var _this8 = this;

        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          (0, _warning2['default'])(false, '`submit` is deprecated.' + 'Actually, it\'s more convenient to handle submitting status by yourself.');
        }
        var fn = function fn() {
          _this8.setState({
            submitting: false
          });
        };
        this.setState({
          submitting: true
        });
        callback(fn);
      },
      render: function render() {
        var _props = this.props,
            wrappedComponentRef = _props.wrappedComponentRef,
            restProps = (0, _objectWithoutProperties3['default'])(_props, ['wrappedComponentRef']);

        var formProps = (0, _defineProperty3['default'])({}, formPropName, this.getForm());
        if (withRef) {
          if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            (0, _warning2['default'])(false, '`withRef` is deprecated, please use `wrappedComponentRef` instead. ' + 'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
          }
          formProps.ref = 'wrappedComponent';
        } else if (wrappedComponentRef) {
          formProps.ref = wrappedComponentRef;
        }
        var props = mapProps.call(this, (0, _extends3['default'])({}, formProps, restProps));
        return _react2['default'].createElement(WrappedComponent, props);
      }
    });

    return (0, _utils.argumentContainer)(Form, WrappedComponent);
  };
}

exports['default'] = createBaseForm;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ })

},[583]);