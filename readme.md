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
        "parse/save-with-master": 2
    }
}
```


## List of supported rules

* [does-not-exist](docs/rules/does-not-exist.md): Prevent using slow `Parse.Query#doesNotExist`
* [global-master](docs/rules/global-master.md): Prevent using `Parse.Cloud.useMasterKey()`
* [save-with-master](docs/rules/save-with-master.md): Prevent creating by mistake `useMasterKey` property when saving


## License

`eslint-plugin-parse` is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
