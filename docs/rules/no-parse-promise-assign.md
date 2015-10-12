# Don't assign variables explicitly to a `Parse.Promise` instance (no-parse-promise-assign)

Using the "defer function" pattern is not recommended:
- the name does not match [Promises/A+](https://promisesaplus.com/). `as()` vs `resolve()`
- there is a chance you will forget to `resolve` or `reject`
- on the browser or node, it would be better to use [Promises/A+](https://promisesaplus.com/)
- on `Parse Cloud Code`, you cannot use async functions (such as `setTimeout`)
which don't belong to the `Parse JavaScript SDK` so you never actually need to use this functionality to convert from async to Promises
- assigning `Parse.Promise.as` or `Parse.Promise.error` is also a bad pattern.
You might forget about it when you return the promise or you will override it by mistake

## Rule Details

The following patterns are considered warnings:

```js
// It's not recommend, because it confusing because:
// - it's a defered function
// - on browser / node, better use Promise/A+
// - on Parse Cloud Code, there is no point in using it
var promise = new Parse.Promise();

```

```js
function badFunction(param) {
    var promise = Parse.Promise.as('hi');

    if (param) {
        // You might forget to reassign or
        // return something else
    }

    return promise;
}

```

The following patterns are not warnings:

```js
// It's okay, because it's an indirect creation of a Parse.Promise instance
var query = new Parse.Query('Item')
    .equalTo('happy', true)
    .find();
```

```js
function goodFunction() {
    return Parse.Promise.as('hi');
}
```

```js
function goodFunction() {
    var query = new Parse.Query('Item')
        .equalTo('happy', true)
        .find();

    return Parse.Promise.when([
        query,
        Parse.Promise.as(someValue);
    ]);
}
```


## When Not To Use It

If you need to disable this rule.


## Further Reading

- [Promises/A+](https://promisesaplus.com/)
- [Parse.Promise](http://parse.com/docs/js/api/symbols/Parse.Promise.html)
