module.exports = ctx => ({
	ObjectExpression(node) {
		if (node.properties.length === 0) return;

		for (const prop of node.properties) {
			if (prop.method || prop.shorthand || prop.computed) return;
			if (prop.type !== 'Property') return; // could be a spread expression, etc.
			if (prop.key.type !== 'Identifier' && prop.key.type !== 'Literal') return;
			if (prop.value.type !== 'Literal' || prop.value.value === null) return;

			const key = (prop.key.name || prop.key.value).toString();
			const val = prop.value.value.toString();

			if (key !== val) return;
		}

		ctx.report(node, 'All keys are identical to their values');
	}
});
