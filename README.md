# eslint-plugin-smelly

Find code patterns that might be code smell

# Usage

Install via npm:

```console
$ npm install --save-dev eslint-plugin-smelly
```

And include it in your eslint config:

```js
{
	"plugins": ["smelly"],
	"extends": ["plugin:smelly/warn"] /* or */ ["plugin:smelly/strict"]
}
```

## License

Released under the [MIT License](LICENSE).
