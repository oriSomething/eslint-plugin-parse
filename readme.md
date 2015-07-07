eslint-plugin-parse
===

ESLint plugin for working with [Parse](https://parse.com/).


# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.
```
$ npm install eslint
```

If you installed `ESLint` globally, you have to install Parse plugin globally too. Otherwise, install it locally.
```
$ npm install eslint-plugin-parse
```


## Configuration

Add to `plugins` section `parse` on `.eslintrc`.

```json
{
  "plugins": [
    "parse"
  ]
}
```

After that, you can enable / disable rules by need, the default is:

```json
{
    "rules": {
        "parse/does-not-exist": 2,
        "parse/global-master": 1,
        "parse/no-not-query": 2,
        "parse/no-parse-promise-assign": 1,
        "parse/no-promise-always": 1,
        "parse/no-slow-query": 1,
        "parse/prefer-parse-promise": 1,
        "parse/save-with-master": 2
    }
}
```


## List of supported rules

* [does-not-exist](docs/rules/does-not-exist.md): Prevent using slow `Parse.Query#doesNotExist`
* [global-master](docs/rules/global-master.md): Prevent using `Parse.Cloud.useMasterKey()`
* [no-not-query](docs/rules/no-not-query.md): Prevent using "not query" functions of `Parse.Query`
* [no-parse-promise-assign](docs/rules/no-parse-promise-assign.md): Prevent assign variable to `Parse.Promise` instance
* [no-promise-always](docs/rules/no-promise-always.md): Prevent the use of `Parse.Promise#always`
* [no-slow-query](docs/rules/no-slow-query.md): Prevent using `Parse.Query` slow functions
* [prefer-parse-promise](docs/rules/prefer-parse-promise.md): Prevent using callbacks `success` / `errors` instead of `Parse.Promise`
* [save-with-master](docs/rules/save-with-master.md): Prevent creating by mistake `useMasterKey` property when saving


## License

`eslint-plugin-parse` is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
