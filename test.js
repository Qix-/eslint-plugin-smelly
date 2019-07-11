const {Linter} = require('eslint');

function rule(name, spec) {
	const linter = new Linter();

	linter.defineRule(name, {
		create: require(`./lib/${name}`)
	});

	const lintOpts = spec.opts || {
		parserOptions: { ecmaVersion: 2018 },
		rules: {[name]: 'error'}
	};

	spec.valid.forEach(code => {
		exports[`\x1b[36m${name}\x1b[39m :: \x1b[32mOK\x1b[39m :: ${code}`] = () => {
			const result = linter.verify(code, lintOpts);

			if (result.length !== 0) {
				const err = new Error('valid code failed');
				err.expected = {pass: code};
				err.actual = result;
				throw err;
			}
		}
	});

	spec.invalid.forEach(code => {
		exports[`\x1b[36m${name}\x1b[m :: \x1b[31mWTF\x1b[39m :: ${code}`] = () => {
			const result = linter.verify(code, lintOpts);

			if (result.length === 0) {
				const err = new Error('invalid code passed validation');
				err.expected = {fail: code};
				err.actual = result;
				throw err;
			}

			if (result.length > 1) {
				const err = new Error('invalid code failed with multiple errors');
				err.expected = {fail: code};
				err.actual = result;
				throw err;
			}

			// only 1 error code
			if (result[0].ruleId !== name) {
				const err = new Error('code failed with wrong rule');
				err.expected = {failWith: name};
				err.actual = result;
				throw err;
			}
		}
	});
}

rule('identical-keyvals', {
	valid: [
		`const o = {}`,
		`const o = {foo}`,
		`const o = {foo, bar: 'bar'}`,
		`const o = {foo: 'bar'}`,
		`const o = {foo: 'foo', 'bar': 'bar', 'qux': 1234}`,
		`const o = 1234`,
		`const o = {foo}.foo`,
		`const o = {[foo]: foo}`,
		`const o = {foo: foo}`,
		`const o = {foo: foo, bar: 'bar'}`,
		`const o = {foo: "foo", bar: "bar", qux: null}`,
		`const o = {foo: "foo", bar: "bar", qux: undefined}`,
		`const o = {foo: "foo", ...{}}`
	],
	invalid: [
		`const o = {foo: 'foo'}`,
		`const o = {foo: 'foo', foo: 'foo'}`,
		`const o = {foo: 'foo', bar: 'bar'}`,
		`const o = {"foo": 'foo', bar: 'bar'}`,
		`const o = {"foo": 'foo', "bar": 'bar'}`,
		`const o = {"foo": 'foo', "bar": 'bar', "qux": "qux"}`
	]
});
