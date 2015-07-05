# Disallow global use of master key (global-master)

Using `Parse.Cloud.useMasterKey()` is discourage because it enter all operation
after this call to master mode, which mean, everything from queries to saving
object might treated differently than what you would expected.


## Rule Details

The following patterns are considered warnings:

```js
Parse.Cloud.useMasterKey();

new Parse.Query("_Installation")
    .find()
    .then(...);
```

The following patterns are not warnings:

```js
new Parse.Query("_Installation")
    .find({
        useMasterKey: true
    })
    .then(...);
```


## When Not To Use It

If you need to disable this rule.


## Further Reading

[Parse.Cloud.useMasterKey documentation](http://parse.com/docs/js/api/symbols/Parse.Cloud.html#.useMasterKey)
