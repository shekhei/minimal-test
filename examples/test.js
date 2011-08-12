var scenario = require('minimal-test');
var path = require('path');

scenario("Testing somet of the stuff")
  ("Lets test that things are true", function(test){
    test(true);
  })
  ("lets test a fasle", function(test){
    test(false);
  })
  ("Lets ensure 1 is a number", function(test){
    test.is.a.number(1);
  })
  ("Lets ensure 'a' is not a number", function(test){
    test.is.a.number("a");
  })
  ("Lets ensure 'a' is a string", function(test){
    test.is.a.string("a");
  })
  .async("if random.txt exists async(doesnt exist)", function(test){
    path.exists(require('path').resolve('./unit_test/file.txt'),function(exists){
      test(exists);
      test.done();
    });
  })
  .async("if exists.txt exists async", function(test){
    path.exists(require('path').resolve('./exists.txt'),function(exists){
      test(exists);
      test.done();
    });
  })
  ("Lets ensure that [1,1] is an array", function(test){
    test.is.a.array([1,1]);
  })
