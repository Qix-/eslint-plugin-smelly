module.exports = {
	rules: {},
	configs: {
		strict: {
			plugins: ['smelly'],
			rules: {}
		},
		warn: {
			plugins: ['smelly'],
			rules: {}
		}
	}
};

[
	'identical-keyvals'
].forEach(name => {
	module.exports.rules[name] = require(`./lib/${name}`);
	module.exports.configs.warn.rules[`smelly/${name}`] = 'warn';
	module.exports.configs.strict.rules[`smelly/${name}`] = 'error';
});
