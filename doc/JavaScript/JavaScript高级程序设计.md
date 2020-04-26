### 原型与 in 操作符

1. 有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中。hasOwnProperty()只在属性存在于实例中时才返回 true，因此同时使用 hasOwnProperty()方法和 in 操作符，就可以确定该属性到底是存在于对象中，还是存在于原型中。封装方法如下：

```javascript
/**
 *
 * @param {*} object 检测的对象
 * @param {*} name 检测对象的属性
 * return true 表示属性存在于原型中，false 表示属性存在于对象中
 */
function hasPrototypeProperty(object, name) {
  return !Object.hasOwnProperty(name) && name in object;
}
```

2. 要取得对象自身所有**可枚举**的实例属性，可以使用 ECMAScript5 的 Object.keys()方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

```javascript
function Person() {}
Person.prototype.name = "ming";
Person.prototype.age = 22;
Person.prototype.job = "code";
Person.prototype.getName = function () {
  return this.name;
};

var keys = Object.keys(Person.prototype);
console.log(keys); // [ 'name', 'age', 'job', 'getName' ]

var p1 = new Person();
p1.name = "hong";
p1.age = 18;
var p1Keys = Object.keys(p1);
console.log(p1Keys); // [ 'name', 'age' ]
```

这里，变量 keys 是一个数组，数组中是字符串'name', 'age', 'job', 'getName'。这个顺序和 for-in 循环中出现的顺序一致。如果传参是 Person 的实例，则 Object.keys()返回的数组只包含'name'和'age'这两个实例属性。

3. 如果想要得到所有的对象自身属性（不包括 Symbol 值作为名称的属性），无论它是否可枚举，都可以使用 Object.getOwnPropertyNames()方法。

```javascript
var keys = Object.getOwnPropertyNames(Person.prototype);
console.log(keys); // [ 'constructor', 'name', 'age', 'job', 'getName' ]
```

注意结果中包含了不可枚举的 constructor 属性。Object.keys()和 Object.getOwnPropertyNames()方法都可以用来替代 for-in 循环，但需要注意两者之间的区别。

### 原型的动态性

1. 由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反射出来——即使是先创建了实例后修改原型也是照样如此。

```javascript
function Person() {}
var p = new Person();
Person.prototype.sayHi = function () {
  console.log("hi");
};
p.sayHi(); // hi
```

当我们调用 p.sayHi()时，首先会在实例中搜索名为 sayHi 的属性，在没找到的情况下，会继续搜索原型。因为实例与原型之间的连接只不过是一个指针，而非一个副本，因此就可以在原型中找到新的 sayHi 属性并返回函数。

2. 尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果是重写整个原型对象，那么情况就不一样了。我们知道，调用构造函数时会为实例添加一个指向最初原型的[[prototype]]指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。请记住：实例中的指针仅指向原型，而不指向构造函数。

```javascript
function Person() {}
var friend = new Person();
Person.prototype = {
  constructor: Person,
  name: "ming",
  age: 22,
  job: "code",
  sayName: function () {
    console.log(this.name);
  },
};
friend.sayName(); // TypeError: friend.sayName is not a function
```

![重写原型前后对比图](./update_prototype.png)
从图中可以看出，重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系，它们引用的仍然是最初的原型。
