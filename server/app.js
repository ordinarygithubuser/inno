'use strict';

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _iveB = require('ive-b');

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

var server = new _iveB.Server(_conf2['default']);

server.start(function callee$0$0() {
	return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				console.log('app running');

			case 1:
			case 'end':
				return context$1$0.stop();
		}
	}, null, _this);
});