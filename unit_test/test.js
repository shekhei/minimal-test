var scenario = require('../lib/minimal-test');
var path = require('path');

scenario("Testing simple asserts")
  ("Lets test that things are true", function(t){
    t(true);
  })
  ("lets test a fasle", function(t){
    t(false);
  })

scenario("Testing comparison helpers")
  ("ensure t.is(1,new Number(1)) fails", function(t){
    t.is(1,new Number(1));
  })
  ("ensure t.is(1,1) passes", function(t){
    t.is(1,1);
  })
  ("ensure t.is('a', 1) fails", function(t){
    t.is('a',1);
  })
  ("ensure t.equals(1,1) passes", function(t){
    t.equals(1,1);
  })
  ("ensure t.equals(1,new Number(1)) passes", function(t){
    t.equals(1,new Number(1));
  })

scenario("Testing type helpers")
  ("ensure t.is.a.number('a') fails", function(t){
    t.is.a.number("a");
  })
  ("ensure t.is.a.number(1) passes", function(t){
    t.is.a.number(1);
  })
  ("ensure t.is.a.string('a') passes", function(t){
    t.is.a.string("a");
  })
  ("ensure t.is.a.string(1) fails", function(t){
    t.is.a.string(1);
  })
  ("ensure t.is.a.array([]) passes", function(t){
    t.is.a.array([]);
  })
  ("ensure t.is.a.array(1) fails", function(t){
    t.is.a.array(1);
  })

scenario("Testing the rest")
  .async("if random.txt exists async(doesnt exist, so should fail)", function(t){
    path.exists(require('path').resolve('./unit_test/file.txt'),function(exists){
      t(exists);
      t.done();
    });
  })
  ("Test that assert message gets shown", function(t){
    t(false, "This has to be shown");
  })
