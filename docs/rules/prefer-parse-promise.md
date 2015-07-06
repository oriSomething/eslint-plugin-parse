# Prefer Parse.Promise over option object with success / error (prefer-parse-promise)

Many functions of `Parse JavaScript SDK` that returns `Parse.Promise` also
have an `options` param that can contain `success` or `fail` callbacks, almost
identical to `then` function. Having both in the code base can be very
confusing, and most likely you find your self using `Parse.Promise` anyway, so
it's preferred to use `Parse.Promise` from the beginning instead.


## Rule Details

The following patterns are considered warnings:

```js
var user = Parse.User.current();

user.fetch({
    success: function() {
        // ...
    }
});

```


## When Not To Use It

If you prefer using callbacks or using library like `Backbone` that work with
identical callbacks pattern.
