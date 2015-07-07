# There are known slow queries that should be avoided (no-slow-query)

`Parse.Query` contains some query function that are known to be a slow query
function mostly because some of them cannot be indexed by the database.
In small scale they might seems to be fast and performance, but as the database
get bigger you might not be able to get result because of 15 seconds timeouts.


## Rule Details

The list of slow query functions (of `Parse.Query`):
- doesNotExist
- doesNotMatchKeyInQuery
- doesNotMatchQuery
- endsWith
- exists
- matches
- notContainedIn
- notEqualTo
- startsWith


The following patterns are considered warnings:

```js
var query = new Parse.Query('App')
    .exists('android');
```

```js
someQuery.exists('android');
```


The following patterns are not warnings:

```js
function exists(who) {
    console.log(who + ' exists!');
}

// `exists` isn't a concatenated function so it's `Parse.Query#exists`
exists('me');
```

```js
// Because it's a wrong type argument, it's assume it's not `Parse.Query#exists`
someObject.exists(true);
```

## Options

Turn on `matches` check (because it's collide with String#matches).


## When Not To Use It

If you need to disable this rule.


## Further Reading

- [Parse.Query](http://parse.com/docs/js/api/symbols/Parse.Query.html#doesNotExist)
- [Performance guide of Parse iOS SDK](https://parse.com/docs/ios/guide#performance)
