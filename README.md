[![Build Status](https://travis-ci.org/aronnax/pooling.svg?branch=master)](https://travis-ci.org/aronnax/pooling)

# aronnax pooling

An object pool for JS. Can be used for node or the browser.

The purpose is to minimize garbage collection, which can interfere with fast
performance, especially in event looped systems such as games.

## setup

Install with npm.
```
npm install aronnax-pooling
```

Require if using with nodejs or browserify.
```
var Pooled = require('aronnax-pooling');
```

Extend from Pooled class
```
var myClass = Object.create(Pooled);
```

Use `make` to create new objects,
```
var instance = myClass.make();
```

or extend the classes constructor
```
function myClass() {
  var inst = this.make();

  return inst;
}
```

## Development
Install dependencies
```
npm install
```

Lint, test build
```
npm run lint
npm run test || testem
npm run compile-all
```
