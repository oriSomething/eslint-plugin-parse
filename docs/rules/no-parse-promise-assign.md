# Don't assign variables explicitly to Parse.Promise instance (no-parse-promise-assign)

Using the deffer function pattern as the `Parse.Promise` object is, can be
problematic:
- it's [Promises/A+](https://promisesaplus.com/), so the **name** confusing, so…
- there is a change you will forget to `resolve` or `reject`
- on the browser or node, it would be better to use [Promises/A+](https://promisesaplus.com/)
- on `Parse Cloud Code`, you cannot use async functions such as `setTimeout`
which aren't belong to the `Parse JavaScript SDK` so you never actually have a
reason to create `Parse.Promise` instance
- assign `Parse.Promise.as` or `Parse.Promise.error` is also a bad pattern,
because it means you might forget about it when you return the promise or you
will override it by mistake


## Rule Details

The following patterns are considered warnings:

```js
// It's not recommend, because it confusing because:
// - it's deffer function
// - on browser / node, better use Promise/A+
// - on Parse Cloud Code, there is no point using it
var promise = new Parse.Promise();

```

```js
function badFunction(param) {
    var promise = Parse.Promise.as('hi');

    if (param) {
        // Or Forget reassign or
        // return something else
    }

    return promise;
}

```

The following patterns are not warnings:

```js
// It's okay, because it's a directly creation of Parse.Promise instance
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
