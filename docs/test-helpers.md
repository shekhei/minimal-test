Test Helpers
============

When you create a test,

```javascript
scenario("A scenario")
  ("A test", function(test){
  })
```

The parameter test comes with a couple of assertion helpers, below are a list of them

Comparision helpers
-------------------

###test.is###

test.is accepts two parameters for comparision, it is a strict comparison (below is an example)

```javascript
test.is(1,1); // pass
test.is(1, new Number(1)); // fails
```

###test.equals###

test.equals accepts two parameters for comparision, it is a non-strict comparison (below is an example)

```javascript
test.equals(1,1); // pass
test.equals(1, new Number(1)); // pass
test.equals("", []); // pass
test.equals(1,2); // fails
```

Type helpers
------------

###test.is.a###

test.is.a accepts two parameters, obj and type(String)

```javascript
test.is.a([],'array'); // true
test.is.a(1,'number'); // true
test.is.a(1,'string'); // false
```

###test.is.a.number###

```javascript
test.is.a.number(1); //pass
```

is a shorthand for

```javascript
test.is.a(1,'number');
```

###test.is.a.string###

```javascript
test.is.a.string("abc"); //pass
```

is a shorthand for

```javascript
test.is.a("abc","string");
```

###test.is.a.array###

```javascript
test.is.a.array([]); // pass
```

is a shorthand for

```javascript
test.is.a([],"array");
```
