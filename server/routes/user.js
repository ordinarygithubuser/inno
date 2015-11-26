'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _iveB = require('ive-b');

var success = { success: true };
var fail = { success: false };

var UserRoute = (function (_Route) {
	_inherits(UserRoute, _Route);

	function UserRoute(db) {
		_classCallCheck(this, UserRoute);

		_get(Object.getPrototypeOf(UserRoute.prototype), 'constructor', this).call(this, db);
	}

	_createDecoratedClass(UserRoute, [{
		key: 'login',
		decorators: [_iveB.Route.isRoute()],
		value: function login(res, data) {
			return regeneratorRuntime.async(function login$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						this.getSession().setUser(data);
						res.reply('login', data);

					case 2:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this);
		}
	}, {
		key: 'logout',
		decorators: [_iveB.Route.isRoute()],
		value: function logout(res) {
			this.getSession().setUser(null);
			res.reply('logout', success);
		}
	}, {
		key: 'register',
		decorators: [_iveB.Route.isRoute()],
		value: function register(res) {
			var data = arguments.length <= 1 || arguments[1] === undefined ? { name: null, pass: null } : arguments[1];

			var status = fail;

			if (data.name != null && data.pass != null) {
				this.getSession().setUser({ name: name, pass: pass });
				status = success;
			}
			res.reply(status);
		}
	}]);

	return UserRoute;
})(_iveB.Route);

exports['default'] = UserRoute;
module.exports = exports['default'];