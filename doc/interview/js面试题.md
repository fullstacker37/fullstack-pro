### js 原始类型有哪几种？null 是对象类型吗？

在 js 中，存在 6 种原始（基本）类型：String、 Number、 Boolean、 Null、 Undefined、 Symbol
引用数据类型：Object、Array、Function

对于 `null` 来说，很多人会认为他是个对象类型，其实这是错误的。虽然 typeof null 会输出 `object`，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

### typeof 是否能正确判断数据类型？instanceof 能判断对象的原理是什么？

`typeof`对于原始（基本）类型来说，除了`null`都可以显示正确的类型

`typeof` 对于对象来说，除了函数都会显示 `object`，所以说 typeof 并不能准确判断变量到底是什么类型

```javascript
typeof []; // 'object'
typeof {}; // 'object'
typeof Array.prototype.push; // 'function'
```

如果我们想判断一个对象的正确类型，这时候可以考虑使用 instanceof，因为内部机制是通过原型链来判断的（判断实例的原型是否和构造函数的原型相等）。

```javascript
// L instanceof R
function instance_of(L, R) {
  // L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显式原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    // 已经找到顶层
    if (L === null) {
      return false;
    }
    // 当 O 严格等于 L 时，返回 true
    if (O === L) {
      return true;
    }
    L = L.__proto__; // 继续向上一层原型链查找
  }
}
```
