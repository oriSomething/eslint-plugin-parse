# Prohibit the use of the "nots" query function (no-not-query)

`Parse.Query` contains some query functions which cannot be indexed. That means
that every time you use this kind of query, the database needed to check all of
the rows of the table. In big scale it might lead to timeouts.


## Rule Details

The list of *not query* functions (of `Parse.Query`):
- doesNotExist
- doesNotMatchKeyInQuery
- doesNotMatchQuery
- notContainedIn
- notEqualTo


The following patterns are considered warnings:

```js
var itemQuery = new Parse.Query("Item");

// ...

itemQuery.notExists('review');
```


The following patterns are not warnings:

```js
function notExists() {
    // ...
}

// `notExists` isn't a concatenated function so it's `Parse.Query#notExists`
notExists();
```


## When Not To Use It

If you need to disable this rule.


## Further Reading

- [Parse.Query](http://parse.com/docs/js/api/symbols/Parse.Query.html#doesNotExist)
- [Performance guide of Parse iOS SDK](https://parse.com/docs/ios/guide#performance)
