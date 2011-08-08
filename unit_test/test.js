var test = require('../lib/unit_tester');

test("Testing somet of the stuff")
  ("This should say yes", function(){
    should.say("yes");
    console.log("yes");
  })
  ("This should say yes, but saying no", function(){
    should.say("yes");
    console.log("no");
  })
  ("This should say no", function(){
    should.say("no");
    console.log("no");
  })
  ("Lets assert that things are true", function(){
    should(true);
  })
  ("lets assert a fasle", function(){
    should(false);
  });
