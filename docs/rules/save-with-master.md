# Prevent saving an object with attribute `useMasterKey` (save-with-master)

When using `Parse.Object#save` with `useMasterKey`, there is a high probability
of setting new property for the object of the name `useMasterKey` instead of
entering to master mode on Cloud code.


## Rule Details

The following patterns are considered warnings:

```js
parseObject.save({
    useMasterKey: true
});
```

The following patterns are not warnings:

```js
parseObject.save(null, {
    useMasterKey: true
});
```

```js
parseObject.save({
    name: "cool name"
}, {
    useMasterKey: true
});
```

```js
// This won't raise an error because it seems to be delivery
parseObject.save({
    useMasterKey: true
}, {
    useMasterKey: true
});
```


## When Not To Use It

If you must turn off this rule.
