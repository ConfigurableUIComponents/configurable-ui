import { merge, fulfilment } from './config-utilities';

const obj1 = { myStr: 123 };
const obj2 = { myStr: 'abc'};
const obj3 = { myStr: 'WOW' };
const func = function(){};

test('merge two objects', () => {
  const result = merge(obj1, obj2);
  expect(result.myStr).toEqual('abc');
});

test('merge three objects', () => {//What is really wanted here?
  const arr = [obj1, obj3];
  const result = merge(arr,obj2);
  expect(result.myStr).toEqual('abc');
});

test('merge layer into null', () => {
  const result = merge(undefined,obj2);
  expect(result.myStr).toEqual('abc');
});

test('merge layer with a function property', () => {
  obj2.myFunc = function(a,b){
  return a+b;
  };
  const result = merge(obj1,obj2);
  expect(result.myFunc(7,3)).toEqual(10);
});

test('merge layer with an array property', () => {
  obj2.myArray = ['first','second'];
  const result = merge(obj1,obj2);
  expect(Array.isArray(result.myArray)).toBeTruthy();
});

test('merge layers with object properties', () => {
  obj1.myObj = {key1: 'firstKey'};
  obj2.myObj = {key2: 'secondKey'};
  const result = merge(obj1,obj2);
  expect(result.myObj.key2).toEqual(obj2.myObj.key2);
});

test('merge with null', () => {
  obj1.myStr = 123;
  const result = merge(obj1);
  expect(result.myStr).toEqual(123);
});

test('merge layer with null property', () => {
  obj1.myNull = 42;
  obj2.myNull = undefined;
  const result = merge(obj1,obj2);
  expect(result.myNull).toEqual(42);
});

test('fulfilment test', () => {
  const props = {
    Card: func,
    Itay: "itay"
  };
  const config = {
    myString: "${Card}"
  };
  const result = fulfilment(config, props);
  expect(result.myString).toEqual(func);
});

test('fulfilment keep property that isnt wrapped with ${}', () => {
  const props = {
    Card: func,
    Itay: "itay"
  };
const config = {
  myString: "${Card}",
  otherString: "lalala"
};
const result = fulfilment(config, props);
expect(result.otherString).toEqual('lalala');
});

test('fulfilment object property with a Card', () => {
  const props = {
    Card: func,
    Itay: "itay"
  };
const config = {
  myObj: {myString: "${Card}"}
};
const result = fulfilment(config, props);
expect(result.myObj.myString).toEqual(func);
});

test('fulfilment with various Cards and things to fulfill', () => {
  const props = {
    Card: func,
    Itay: "itay",
  };
  const config = {
    myObj: {myString: "${Card}"},
    myFulfillStr: "${Card}",
    mySimpleStr: "imastring",
    myArr: ["first", "${Card}"],
    myFunc: func,
    myTitle: "${Iframe}"
  }
  const result = fulfilment(config,props);
  expect(result.myObj.myString).toEqual(func);
  expect(result.myFulfillStr).toEqual(func);
  expect(result.mySimpleStr).toEqual("imastring");
  expect(result.myFunc).toEqual(func);
});

test('fulfilment array property with a Card', () => {
  const props = {
    Card: func,
    Itay: "itay"
  };
const config = {
  myFulfillStr: "${Card}",
  myArr: ["first", "${Card}"]
};
const result = fulfilment(config, props);
expect(result.myArr[1]).toEqual(func); //I'm not sure this is what we would expect
});

test('fulfilment multiple props to fulfill(replace)', () => {
  const props = {
    Card: func,
    Iframe: 100,
    Itay: "itay"
  };
const config = {
  myObj: {myString: "${Card}"},
  myFulfillStr: "${Card}",
  mySimpleStr: "imastring",
  myIframe: "${Iframe}"
};
const result = fulfilment(config, props);
expect(result.myIframe).toEqual(100);
expect(result.mySimpleStr).toEqual("imastring");
});