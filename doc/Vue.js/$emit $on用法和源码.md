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


### $emit的源码实现



```javascript
// 原生数组原型

```

### $on的源码实现

```javascript
// todo
```
