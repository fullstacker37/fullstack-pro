const arrayProto = Array.prototype;
const arrayMethod = Object.create(arrayProto);

["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  (method) => {
    const originalMethod = arrayMethod[method];
    Object.defineProperty(arrayMethod, method, {
      configurable: true,
      writable: true,
      enumerable: false,
      value: function (...arg) {
        return originalMethod.apply(this, arg);
      },
    });
  }
);

let arr = [1, 2, 3];
let p = new Proxy(arr, {
  get: function (target, key) {
    switch (key) {
      case "push":
    }
  },
  set: function (target, key, value) {
    console.log("set: ", arguments);
  },
});
console.log(p);
p[1];
p[1] = "a";
console.log(arr, p);
