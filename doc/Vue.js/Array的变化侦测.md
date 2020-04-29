可能很多人不是太理解为什么 Array 的侦测方式和 Object 的不同，下面我们举例说明：

```javascript
this.dataList.push(22);
```

Object 的变化侦测是通过 getter/setter 实现的，但是数组数据的改变可能会使用 push、pop、unshift 等方式，并不会触发 getter/setter。

正因为我们可以通过 Array 原型上的方法来改变数组的内容，所以 Object 那种通过 getter/setter 的实现方式就行不通了。

前面例子中使用 push 来改变数组的内容，那么我们如果在用户使用 push 操作数组的时候得到通知，就能实现追踪变化的目的。可惜的是，在 ES6 之前 JavaScript 并没有提供可以拦截原型方法的能力，但是我们可以用自定义的方法去覆盖原生的原型方法。

思路就是：我们用一个拦截器覆盖 Array.prototype,之后每当使用 Array 原型上的方法操作数组时，其实执行的都是拦截器中提供的方法，比如 push、pop 等方法。然后，在拦截器中使用原生 Array 的原型方法去操作数组。

### 拦截器的实现

拦截器其实就是一个和 Array.prototype 一样的 Object，里面包含的属性一模一样，只不过这个 Object 中某些可以改变数组内容的方法是经过我们处理的。

经过整理发现，Array 原型中可以改变数组自身内容的方法有 7 个，分别是 push、pop、shift、unshift、sort、reverse、splice。

```javascript
// 原生数组原型
const arrayProto = Array.prototype;
// 创建一个继承原生数组原型的对象
const arrayMethods = Object.create(arrayProto);

["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  (method) => {
    // 保存原始方法
    const originalMethod = arrayMethods[method];
    Object.defineProperty(arrayMethods, method, {
      configurable: true,
      writable: true,
      enumerable: false,
      // 重新封装每个方法
      value: function mutator(...arg) {
        return originalMethod.apply(this, arg); // 使用原始方法操作数组
      },
    });
  }
);
```

上面代码中，我们创建了变量 arrayMethods，它继承自 Array.prototype，具备其所有功能。未来，我们要使用 arrayMethods 去覆盖 Array.prototype。

接下来，在 arrayMethods 上使用 Object.defineProperty 方法将那些可以改变数组自身内容的方法进行封装。

所以，当使用 push 方法的时候，其实调用的是 arrayMethods.push，而 arrayMethods.push 是函数 mutator，也就是说，实际上执行的是 mutator 函数。

最后，在 mutator 中执行 originalMethod 来做它应该做的事，比如 push 功能。

因此，我们就可以在 mutator 函数中做一些其他的事情，比如说发送数组内容变化通知。

### 使用拦截器覆盖 Array 原型

拦截器完成之后，想要让它生效，就需要使用它去覆盖 Array.prototype。但是又不能直接覆盖，因为会污染全局的 Array，这并不是我们希望看到的结果。我们希望拦截操作只针对那些被记为依赖（被侦测了变化）的数据生效，也就是说希望拦截器只覆盖那些响应式数组的原型。

而 vue 中将一个数据转换成响应式的，需要通过 Observer，所以我们只需要在 Observer 中使用拦截器覆盖那些即将被转换成响应式 Array 类型数据的原型就好了：

```javascript
export class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods; // 通过__proto__使用拦截器覆盖value原型
    } else {
      this.walk(value);
    }
  }
}
```
