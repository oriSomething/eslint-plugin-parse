# Never use `Parse.Query#doesNotExist`, use `#equalTo(key, null)` (does-not-exist)

`Parse.Query.doesNotExist` is really slow and not needed. for almost identical
result (very rare the result will be different) but more performance, use
`Parse.Query.equalTo(key, null)`.


## Rule Details

The following patterns are considered warnings:

```js
new Parse.Query('_Installation')
    .doesNotExist('noNotifications')
```


## When Not To Use It

If you need to disable this rule.


## Further Reading

[Parse.Query.doesNotExist() documentation](http://parse.com/docs/js/api/symbols/Parse.Query.html#doesNotExist)
