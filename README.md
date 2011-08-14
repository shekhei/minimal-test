Minimal Testing
===============

It's always been a pain to type a lot to get something done, and when it comes to unit testing(very boring stuff IMO :P) it is even more painful when you cant get it done with typing as little as possible.

It is quite normal that the syntax would look like this

```javascript
var test = require('someunittest');

scenario('test')
  .test("abc", function(test){ test.assert(true); })
  .test("abc2", function(test){test.assert(false);})
  .run();
```

in this, it would look like this

```javascript
var scnario = require('minimal-test');

scenario('test')
  ("abc", function(test){ test(true); })
  ("abc2", function(test){ test(false); })
```

You can run it by just executing it like any other nodejs files

```
node unit_test/test.js
```

Usage
--------

```
npm install minimal-test
```

```javascript
var scenario = require('minimal-test');
var path = require('path');

scenario("Lets just test some simple things")
  ("Lets test if 1 is a number", function(test){
    test.is.a.number(1);
  })
  ("Lets test if 'a' is a number", function(test){
    test.is.a.number('a');
  })
  .async("Lets test if a file exists? this is async", function(test){
    path.exists(path.resolve("./file.txt"), function(exists){
      test(exists);
      test.done();
    });
  })
```

### Output ###
```
Scenario: Lets just test some simple things
  Lets test if 1 is a number passed
  Lets test if 'a' is a number failed
  Lets test if a file exists? this is async passed
```

Helpers
-------

There are a bunch of helpers that comes along with the test object that is passed on to the testcase functions, [check out the helper doc](https://github.com/shekhei/minimal-test/blob/master/docs/test-helpers.md)

Note
----

Currently due to the way npm includes dependencies, this has to be installed locally(or linked) if not it will not resolve require properly.
