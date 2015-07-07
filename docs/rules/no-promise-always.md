# Prevent usage of `Parse.Promise#always` (no-promise-always)

The usage of `Parse.Promise#always` can easily lead to a mistake, because if the
return value is not of `Parse.Promise`, the flow will continue to the next
`done` or `fail` function by what the `always` replaced in that case.

For example:

```js
new Parse.Query('Item')
    .first()
    // `always` returns non `Parse.Promise` value
    .always(function() {
        return true;
    })
    // Is `success` function will be called? Or `fail` maybe?
    .then(done, fail);
    // Despond if `always` called instead of `resolve` or `reject`
```


## Rule Details

The following patterns are considered warnings:

```js
promise.always(someFunction);
```

The following patterns are not warnings:

```js
// `always` is not concatenated, so it's probably not a promise
always();
```


## When Not To Use It

If you need to disable this rule.


## Further Reading

- [Parse.Promise](http://parse.com/docs/js/api/symbols/Parse.Promise.html)
