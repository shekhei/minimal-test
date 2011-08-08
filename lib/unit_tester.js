var stdin = process.stdin;

var ShouldFail = function(){
};
var MustFail = function(){
};
global.should = function(pred, msg){
  if ( pred ) { throw new ShouldFail(msg); }
}
global.should.say = function(condition){

}
global.must = function(pred, msg){
  if ( pred ) { throw new MustFail(msg); }
}
global.must.say = function(){console.log("must say"); }

var testCollection = [];

var tester = function(description){
  var func = function(desc, casefunc){
    if ( !desc ) {
      throw "You have to provide a description to each test case";
    } else if ( !casefunc ) {
      throw "You have to provide a func to the case";
    }
    func.cases.push([desc, casefunc]);
    return func;
  };
  func.description = description;
  func.cases = [];

  return func;
};

tester.prototype = {
  name : "",
  description: "",
  cases : []
};

var test = module.exports = function(name, description){
  var testcase = new tester(description);
  if ( !test.cases ) {
    test.cases = [];
  }
  test.cases.push(testcase);
  return testcase;
};

process.on('exit', function(){
  for ( var i = 0; i < test.cases.length; i++ ) {
    var testcase = test.cases[i];
    process.stdout.write("Scenario: "+testcase.description+"\n");
    var failed = 0;
    for ( var j = 0; j < testcase.cases.length; j++ ) {
      process.stdout.write("  "+testcase.cases[j][0]+"\n");
      var succeed = true;
      try {
        testcase.cases[j][1]();
      } catch ( e ) {
        if ( e instanceof ShouldFail ) {
          process.stdout.write( " \x1b[0;31mfailed\x1b[0m\n");
        } else {
          console.log(e);
        }
        ++failed;
        succeed = false;
      }
      if ( succeed ) {
        process.stdout.write(" \x1b[0;32mpassed\x1b[0m\n");
      }
    }
    process.stdout.write("  overall: "+((failed > 0 ) ? "failed" : "passed")+" "+failed+" failed out of "+testcase.cases.length);
  }
});

