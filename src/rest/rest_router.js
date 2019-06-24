'use strict';
let PhinkJS = global.PhinkJS || {};
PhinkJS.Rest = PhinkJS.Rest || {};

PhinkJS.BaseRouter = require('../core/base_router.js');

PhinkJS.Rest.Router = class F extends PhinkJS.BaseRouter {
	constructor(parent, req, res) {
		super(parent, req, res);

		this._apiFileName = '';
	}

	translate(callback) {

		if (this._translation === '') {

			var qstring = this._request.url.replace(/\/api\//, '');
			var qParts = qstring.split('/');
			this._className = qParts.shift();

			var value = qParts.shift();

			var parameter = {};
			parameter[this._className] = value;

			if (parameter !== undefined) {
				this._parameters = this._parameters || {};
				Object.assign(this._parameters, parameter);

			}

		}

		this._apiFileName = global.APP_ROOT + 'rest' + global.DIRECTORY_SEPARATOR + this._className + '.js';
		console.log(this._apiFileName);

		require('fs').exists(this._apiFileName, function (exists) {
			callback(exists);
		});
	}

	dispatch(callback) {
		var data = [];
		var method = this._request.method.toLowerCase();
		console.log(method);

		var fqObject = require(this._apiFileName);
		var instance = new fqObject();

		console.log("***/***");
		console.log(instance);
		console.log("***/***");

		var result = '';
		if (typeof instance[method] === 'function') {
			var res = this._response;
			var req = this._request;

			data = this._parameters || {};

			console.log(data);

			Object.keys(data).forEach(function (key) {
				const value = data[key];
				const fqProperty = instance[key];

				if (typeof fqProperty === 'function') {
					fqProperty(value);
					var res = fqProperty();
					console.log(res);
				}

			});

			instance[method](function (data) {
				//res.statusCode = 200;
				//res.setHeader('Content-Type', 'application/json');
				res.writeHead(200, {
					'Content-Type': 'application/json',
					'charset': 'utf-8'
				});
				var stream = JSON.stringify(data);
				if (typeof callback === 'function') {
					callback(req, res, stream);
				}
			});
		} else {
			console.log(this._className + '.' + method + ' not found');
		}

	}
}

module.exports = PhinkJS.Rest.Router;