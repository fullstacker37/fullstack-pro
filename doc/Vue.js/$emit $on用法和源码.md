$emit $on使用：

```javascript
triggerFn() {
	this.$emit("submit", "hello");
}

mounted() {
	// 第一种：以数组方式监听事件
    this.$on(["submit", "commit"], this.handleEvents);
	// 第二种：监听同一个事件执行多个回调方法
    this.$on("submit", this.handleEvents);
    this.$on("submit", this.handleEvents1);
    this.$on("submit", this.handleEvents2);
}
```

​		在项目开发过程中，我一直使用的是监听单一事件执行回调函数的方式，从来没有使用过第一种方式（因为压根不知道可以用数组的形式！！），通过看源码偶然了解到原来还可以这样使用，所以说通读源码对框架的使用和原理的理解会有很大的帮助。

​		在看$emit和$on源码前我们先看一下vue实例初始化过程中的事件初始化函数initEvents：

```javascript
function initEvents (vm) {
  vm._events = Object.create(null); // 创建一个空对象，用来存储事件
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
```

### $emit的源码实现

```javascript
Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event]; // 获取发射事件对应的回调方法
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1); // 取出方法传递的参数
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info); // 通过try catch捕获执行过程中的异常
      }
    }
    return vm
  };

function invokeWithErrorHandling (handler, context, args, vm, info) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context); // 回调方法执行
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

```

### $on的源码实现

```javascript
Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) { // 判断$on第一个参数是不是数组，由此可以知道可以传递一个事件数组
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn); // 递归给每个事件添加对应的回调方法
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // 通过push可以判断一个事件对应多个回调
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };
```
