var stdin = process.stdin;
var stdout = process.stdout;
var stderr = process.stderr;

global.is = function(obj, value){
  return obj === value;
}

global.equals = function(obj, value){
  return obj == value;
}

global.is.a = function(type, obj){
  if ( type === "array" ) {
    return is.a.array(obj);
  }
  return typeof obj === type;
}

global.is.a.array = function(obj){
  return Array.isArray(obj);
}

global.contains = function(value, obj) {
    if ( Array.isArray(obj) ) {
      return obj.some(value);
    } else if ( typeof obj === "string" ) {
      return obj.search(pred) === -1;
    }
    throw new InvalidTest("should.contain can only check arrays and strings");
}

var EventEmitter = require('events').EventEmitter;
var run = function(testcase){
  var succeed = true;
  var isAsync = testcase.isAsync || false;
  // i cant figure out a way to reference back to the same testcase...
  var testscope = {
    assert: function(pred, msg){
      if ( !testcase.failed ) {
        if ( !pred ) { testcase.failed = true; testcase.failmsg = msg; }
      }
    }
  }
  testscope.assert.equals = function(obj1, obj2){
    testscope.assert(equals(obj1, obj2));
  }
  testscope.assert.is = function(obj, value, msg){
    testscope.assert(is(obj, value), msg);
  }

  testscope.assert.is.a = function(type, obj, msg) {
    testscope.assert(is.a(type, obj), msg);
  }

  testscope.assert.is.a.array = function(obj, msg) {
    testscope.assert(is.a.array(obj), msg);
  }

  "number string".split(" ").forEach(function(e){
    testscope.assert.is.a[e] = function(obj, msg){
      testscope.assert(is.a(typeof obj, obj), msg);
    }
  });

  testscope.assert.contains = function(pred, obj, msg){
    testscope.assert(contains(pred,obj), msg);
  }

  var async = new EventEmitter();
  async.on('done', function(){
  });
  testscope.assert.done = function(){
    async.emit('done');
  };
  if ( isAsync ) { // not async
    testcase.func.call(testscope,testscope.assert);
  } else {
    testcase.func.call(testscope,testscope.assert);
    testscope.assert.done();
  }
}

var InvalidTest = function(msg){
  this.what = msg;
}

InvalidTest.prototype.what = "";


var testCollection = [];

var tester = function(desc){
  if ( !desc ) {
    throw "You have to have a desc for each scenario";
  }
  var func = function(desc, casefunc){
    if ( !desc ) {
      throw "You have to provide a desc to each test case";
    } else if ( !casefunc ) {
      throw "You have to provide a func to the case";
    }
    var testcase = {"desc":desc, "func":casefunc,"isAsync":false, "failed":false};
    func.cases.push(testcase);
    run(testcase);
    return func;
  };
  func.async = function(desc,casefunc){
    if ( !desc ) {
      throw "You have to provide a desc to each test case";
    } else if ( !casefunc ) {
      throw "You have to provide a func to the case";
    }
    // if third variable is true, it is rsync
    var testcase = {"desc":desc, "func":casefunc,"isAsync":true, "failed":false};
    func.cases.push(testcase);
    run(testcase);
    return func;
  }
  func.desc = desc;
  func.cases = [];
  return func;
};

tester.prototype = {
  name : "",
  desc: "",
  cases : []
};

var test = module.exports = function(desc){
  var testcase = new tester(desc);
  if ( !test.cases ) {
    test.cases = [];
  }
  test.cases.push(testcase);
  return testcase;
};

process.on('exit', function(){
  for ( var i = 0; i < test.cases.length; i++ ) {
    var failed = 0;
    var scenario = test.cases[i];
    process.stdout.write("Scenario: "+test.cases[i].desc+"\n");
    for ( var j = 0; j < test.cases[i].cases.length; j++ ) {
      process.stdout.write( "  "+test.cases[i].cases[j].desc );
      if ( test.cases[i].cases[j].failed ) {
        ++failed;
        process.stdout.write( " \x1b[0;31mfailed\x1b[0m"+(test.cases[i].cases[j].failmsg?" reason: "+test.cases[i].cases[j].failmsg:"")+"\n" );
      } else {
        process.stdout.write( " \x1b[0;32mpassed\x1b[0m\n" );
      }
    }
    process.stdout.write("  overall: "+((failed > 0 ) ? "failed" : "passed")+" "+failed+" failed out of "+test.cases[i].cases.length+"\n\n");
  }
});
