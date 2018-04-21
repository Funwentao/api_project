webpackJsonp([3],{

/***/ 1180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _button = __webpack_require__(31);

var _button2 = _interopRequireDefault(_button);

var _icon = __webpack_require__(20);

var _icon2 = _interopRequireDefault(_icon);

var _message2 = __webpack_require__(44);

var _message3 = _interopRequireDefault(_message2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(36);

__webpack_require__(38);

__webpack_require__(45);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _urlQuery2 = __webpack_require__(211);

var _urlQuery3 = _interopRequireDefault(_urlQuery2);

var _isomorphicFetch = __webpack_require__(39);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _conifg = __webpack_require__(29);

var _StudentCard = __webpack_require__(1181);

var _StudentCard2 = _interopRequireDefault(_StudentCard);

__webpack_require__(1183);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loginUrl = _conifg.CONFIG.loginUrl;

!localStorage.getItem("username") && (location.href = loginUrl);

var _location = location,
    href = _location.href;

var _urlQuery = (0, _urlQuery3.default)(href),
    courseId = _urlQuery.courseId,
    week = _urlQuery.week,
    time = _urlQuery.time;

var server = _conifg.CONFIG.server;

var NameForCall = function (_Component) {
    _inherits(NameForCall, _Component);

    function NameForCall() {
        _classCallCheck(this, NameForCall);

        var _this = _possibleConstructorReturn(this, (NameForCall.__proto__ || Object.getPrototypeOf(NameForCall)).call(this));

        _this.state = {
            left: 20,
            studentList: []
        };
        _this._loadStudents = _this._loadStudents.bind(_this);
        _this.move = _this.move.bind(_this);
        return _this;
    }

    _createClass(NameForCall, [{
        key: 'teacherChangeSign',
        value: function teacherChangeSign(id, value) {
            var _this2 = this;

            var url = server + '/course/' + courseId + '/sign/' + id;
            var state = value !== 3 ? 3 : 2;
            var obj = {
                state: state
            };
            (0, _isomorphicFetch2.default)(url, {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(obj)
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                var studentList = _this2.state.studentList;

                var index = 0;
                studentList.forEach(function (e, i) {
                    if (e.id === id) {
                        index = i;
                    }
                });
                var obj = _extends({}, studentList[index], { state: value !== 3 ? 3 : 2 });
                studentList = [].concat(_toConsumableArray(studentList.slice(0, index)), [obj], _toConsumableArray(studentList.slice(index + 1)));
                if (data.status === 'success') {
                    _this2.setState({
                        studentList: studentList
                    });
                }
            });
        }
    }, {
        key: '_loadStudents',
        value: function _loadStudents() {
            var _this3 = this;

            var url = server + '/course/' + courseId + '/sign?time=' + time + '&week=' + week + '&amount=10';
            (0, _isomorphicFetch2.default)(url, {
                method: 'get',
                mode: 'cors',
                credentials: 'include'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                _this3.setState({
                    studentList: data.list
                });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            this._loadStudents();
            document.onkeyup = function (e) {
                switch (e.keyCode) {
                    case 39:
                        _this4.move(-13);break;
                    case 37:
                        _this4.move(13);break;
                    default:
                        break;
                }
            };
        }
    }, {
        key: 'move',
        value: function move(value) {
            var _this5 = this;

            var left = this.state.left;

            if (value > 0) {
                if (left === 20) {
                    _message3.default.info("已经是第一个学生了");
                    return;
                }
            } else {
                if (left === -4660) {
                    _message3.default.info("已经是最后一个学生了");
                    return;
                }
            }
            var width = 520;
            var clearId = setInterval(function () {
                if (width > 0) {
                    _this5.setState({
                        left: _this5.state.left + value
                    });
                    width -= 13;
                } else {
                    clearInterval(clearId);
                }
            }, 10);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var left = this.state.left;

            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'slider-container' },
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:;', className: 'left-button', onClick: function onClick() {
                                return _this6.move(13);
                            } },
                        _react2.default.createElement(_icon2.default, { type: 'left' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:;', className: 'right-button', onClick: function onClick() {
                                return _this6.move(-13);
                            } },
                        _react2.default.createElement(_icon2.default, { type: 'right' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'slider' },
                        _react2.default.createElement(
                            'div',
                            { className: 'card-container', style: { left: left } },
                            this.state.studentList.map(function (e) {
                                var i = Math.ceil(Math.random() * 10);
                                var color = 'color' + i;
                                return _react2.default.createElement(_StudentCard2.default, { name: e.name,
                                    color: color,
                                    studentNumber: e.student_num,
                                    sign: e.state,
                                    teacherChangeSign: function teacherChangeSign() {
                                        return _this6.teacherChangeSign(e.id, e.state);
                                    },
                                    key: e.student_num });
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    _button2.default,
                    { type: 'primary', size: 'large', onClick: this._loadStudents },
                    '\u91CD\u65B0\u900910\u4E2A\u5B66\u751F'
                )
            );
        }
    }]);

    return NameForCall;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(NameForCall, null), document.getElementById("app"));

/***/ }),

/***/ 1181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(1182);

__webpack_require__(301);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentCard = function (_React$Component) {
    _inherits(StudentCard, _React$Component);

    function StudentCard(props) {
        _classCallCheck(this, StudentCard);

        var _this = _possibleConstructorReturn(this, (StudentCard.__proto__ || Object.getPrototypeOf(StudentCard)).call(this, props));

        _this.state = {
            color: props.color,
            sign: props.sign
        };
        return _this;
    }

    _createClass(StudentCard, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                sign: nextProps.sign
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                color = _state.color,
                sign = _state.sign;
            var _props = this.props,
                name = _props.name,
                studentNumber = _props.studentNumber;

            return _react2.default.createElement(
                'div',
                { className: 'student-card ' + color, onClick: this.props.teacherChangeSign },
                _react2.default.createElement(
                    'div',
                    { className: "tips " + (sign === 3 ? "success" : "failed") },
                    _react2.default.createElement(
                        'div',
                        { className: 'info' },
                        sign === 3 ? "Success" : "Failed"
                    )
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'name' },
                    name
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'number' },
                    studentNumber
                )
            );
        }
    }]);

    return StudentCard;
}(_react2.default.Component);

exports.default = StudentCard;

/***/ }),

/***/ 1182:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1183:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 146:
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

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (string) {
    var queryString = string.split("?")[1];
    var exg = /\w*=\w*/g;
    var array = queryString.match(exg);
    var obj = {};
    array.forEach(function (e) {
        var temp = e.split("=");
        obj[temp[0]] = temp[1];
    });
    return obj;
};

/***/ }),

/***/ 301:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(19);

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(146);
module.exports = self.fetch.bind(self);


/***/ })

},[1180]);