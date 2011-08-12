Minimal Testing
===============

It's always been a pain to type a lot to get something done, and when it comes to unit testing(very boring stuff IMO :P) it is even more painful when you cant get it done with typing as little as possible.

You can run it by just executing it like any other nodejs files

  node unit_test/test.js

Example
--------

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

Scenario: Lets just test some simple things
  Lets test if 1 is a number <span style="color:green;">passed</span>
  Lets test if 'a' is a number <span style="color:red;">failed</span>
  Lets test if a file exists? this is async <span style="color:green;">passed</span>


Note
----

Currently due to the way npm includes dependencies, this has to be installed locally(or linked) if not it will not resolve require properly.
